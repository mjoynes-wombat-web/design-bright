'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateCampaignInfo = exports.createCampaign = exports.createContent = exports.stopCampaign = exports.launchCampaign = exports.getNonprofitsCampaigns = exports.getCampaignContent = exports.getCampaignById = undefined;

var _db = require('./db');

var db = _interopRequireWildcard(_db);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const getCampaignById = exports.getCampaignById = (getCampaignId, success, error) => {
  db.campaigns.find({
    where: { campaignId: getCampaignId }
  }).then(results => {
    if (results === null) {
      return error({ message: `There isn't a campaign with the id ${getCampaignId}.`, error: results, code: 404 });
    }
    const {
      campaignId,
      nonprofitId,
      name,
      duration,
      fundingNeeded,
      donationsMade,
      startDate,
      endDate } = results;

    return success({
      nonprofitId,
      campaignId,
      name,
      duration,
      fundingNeeded,
      donationsMade,
      startDate,
      endDate
    });
  }).catch(findErr => error({ message: `There was a database error finding the campaign with the id ${getCampaignId}.`, error: findErr, code: 500 }));
};

const getCampaignContent = exports.getCampaignContent = (campaignId, success, error) => {
  db.campaigns.find({
    where: { campaignId },
    include: [{
      model: db.campaignContent,
      where: {
        campaignId,
        contentStatus: 'current'
      },
      include: [{
        model: db.campaignText
      }, {
        model: db.campaignImages
      }]
    }]
  }).then(results => {
    const {
      nonprofitId,
      name,
      duration,
      fundingNeeded,
      donationsMade,
      startDate,
      endDate } = results;
    const campaignInfo = {
      nonprofitId,
      campaignId,
      name,
      duration,
      fundingNeeded,
      donationsMade,
      startDate,
      endDate
    };
    const {
      contentId,
      contentStatus,
      createdDate,
      updatedAt,
      campaignTexts,
      campaignImages } = results.campaignContents[0];

    const contentInfo = {
      contentId,
      campaignId,
      contentStatus,
      createdDate,
      updatedAt
    };

    const campaignTextBlocks = campaignTexts.reduce((parsedCampaignText, block) => {
      const parsedBlock = {
        textId: block.textId,
        contentId: block.contentId,
        position: block.position,
        kind: block.kind,
        isVoid: block.isVoid,
        type: block.type,
        nodes: JSON.parse(block.nodes),
        createdAt: block.createdAt,
        updatedAt: block.updatedAt
      };
      parsedCampaignText.push(parsedBlock);
      return parsedCampaignText;
    }, []);

    const campaignImagesBlocks = campaignImages.reduce((cleanedImageData, block) => {
      const cleanedBlock = {
        imgId: block.imgId,
        contentId: block.contentId,
        position: block.position,
        kind: block.kind,
        isVoid: block.isVoid,
        type: block.type,
        data: {
          alt: block.alt,
          src: block.src,
          imageType: block.imageType
        },
        createdAt: block.createdAt,
        updatedAt: block.updatedAt
      };

      cleanedImageData.push(cleanedBlock);
      return cleanedImageData;
    }, []);
    const unsortedCampaignContent = [...campaignImagesBlocks, ...campaignTextBlocks];
    const campaignContent = unsortedCampaignContent.sort((a, b) => a.position - b.position);
    success({
      campaignInfo,
      contentInfo,
      campaignContent
    });
  }).catch(findErr => error(findErr));
};

const getNonprofitsCampaigns = exports.getNonprofitsCampaigns = (nonprofitId, success, error) => {
  db.campaigns.findAll({
    where: { nonprofitId }
  }).then(findResults => {
    const campaigns = [];
    for (let i = 0; i < findResults.length; i += 1) {
      campaigns.push(findResults[i].dataValues);
    }
    success(campaigns);
  }).catch(findErr => error(findErr));
};

const launchCampaign = exports.launchCampaign = (campaignId, nonprofitId, success, error) => {
  db.campaigns.find({
    where: { campaignId }
  }).then(campaign => {
    const startDate = new Date();
    const endDate = new Date(Date.parse(startDate));
    endDate.setDate(endDate.getDate() + campaign.duration);

    db.campaigns.update({ startDate, endDate }, { where: { campaignId, nonprofitId, startDate: null, endDate: null } }).then(updateResults => success(updateResults)).catch(updateErr => error(updateErr));
  }).catch(findErr => console.log(findErr));
};

const stopCampaign = exports.stopCampaign = (campaignId, nonprofitId, success, error) => {
  console.log(campaignId);
  db.campaigns.update({ endDate: new Date() }, {
    where: {
      campaignId,
      nonprofitId,
      startDate: {
        $ne: null
      }
    }
  }).then(updateResults => success(updateResults)).catch(updateErr => error(updateErr));
};

const createContent = exports.createContent = (campaignId, content, success, error) => {
  db.campaignContent.update({ contentStatus: 'previous' }, {
    where: {
      campaignId,
      contentStatus: 'current'
    }
  }).then(() => {
    db.campaignContent.create({
      campaignId,
      contentStatus: 'current',
      createdDate: new Date()
    }).then(newContent => {
      const contentId = newContent.contentId;
      const rawContent = content.document.nodes;
      const blocks = rawContent.reduce((formattedBlocks, block, index) => {
        const newBlocks = formattedBlocks;
        const formattedBlock = {
          contentId,
          position: index + 1,
          kind: block.kind,
          isVoid: block.isVoid,
          type: block.type
        };
        if (['paragraph', 'header'].includes(block.type)) {
          formattedBlock.nodes = JSON.stringify(block.nodes);
          newBlocks.text.push(formattedBlock);
          return newBlocks;
        } else if (block.type === 'image') {
          formattedBlock.alt = block.data.alt;
          formattedBlock.src = block.data.src;
          formattedBlock.imageType = block.data.imageType;
          newBlocks.images.push(formattedBlock);
          return newBlocks;
        }
        return newBlocks;
      }, {
        text: [],
        images: []
      });
      db.campaignText.bulkCreate(blocks.text).then(() => {
        db.campaignImages.bulkCreate(blocks.images).then(() => success({ message: `The content for the campaign with the id ${campaignId} was saved.`, campaignId })).catch(createImagesErr => error({ message: 'There was an error creating the image content.', error: createImagesErr }));
      }).catch(createTextErr => error({ message: 'There was an error creating the text content.', error: createTextErr }));
    }).catch(createContentErr => error({ message: 'There was an error creating the content information.', error: createContentErr }));
  }).catch(updateStatusErr => error({ message: 'There was an error changing the previous content\'s status.', error: updateStatusErr }));
};

const createCampaign = exports.createCampaign = (nonprofitId, { name, fundingNeeded, duration, content }, success, error) => {
  db.campaigns.create({
    nonprofitId,
    name,
    duration,
    fundingNeeded
  }).then(newCampaign => {
    const { campaignId } = newCampaign;
    createContent(campaignId, content, success, error);
  }).catch(createCampaignErr => error({ message: 'There was an error creating the campaign information.', error: createCampaignErr }));
};

const updateCampaignInfo = exports.updateCampaignInfo = (nonprofitId, { campaignId, name, fundingNeeded, duration }, success, error) => {
  db.campaigns.update({
    name,
    fundingNeeded,
    duration
  }, {
    where: {
      nonprofitId,
      campaignId
    }
  }).then(updatedCampaignInfo => {
    if (updatedCampaignInfo[0] === 0) {
      return error({
        message: `The nonprofit with the id ${nonprofitId} doesn't exists or the campaign with the id ${campaignId} doesn't exists or belong to that nonprofit.`,
        error: updatedCampaignInfo
      });
    }
    return success({ message: `The campaign info was saved for campaign id ${campaignId}.`, updatedCampaignInfo });
  }).catch(updateCampaignErr => error({ message: 'There was an error saving the campaign information.', error: updateCampaignErr }));
};
//# sourceMappingURL=campaigns.js.map