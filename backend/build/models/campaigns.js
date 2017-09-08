'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCampaign = exports.updateCampaign = exports.stopCampaign = exports.launchCampaign = exports.getNonprofitsCampaigns = exports.getCampaignContent = undefined;

var _db = require('./db');

var db = _interopRequireWildcard(_db);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

const gatherCampaignImages = rawCampaignImages => {
  const imageData = [];
  rawCampaignImages.forEach(({
    imgId,
    contentId,
    contentPosition,
    imageType,
    src,
    alt
  }) => {
    const imgElement = {
      imgId,
      contentId,
      contentPosition,
      imageType,
      src,
      alt
    };
    imageData.push(imgElement);
  });
  return imageData;
};

const gatherCampaignText = rawTextData => {
  const textData = [];
  rawTextData.forEach(({
    textId,
    contentId,
    contentPosition,
    textType,
    text
  }) => {
    const textElement = {
      textId,
      contentId,
      contentPosition,
      textType,
      text
    };
    textData.push(textElement);
  });
  return textData;
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
        model: db.campaignText2
      }, {
        model: db.campaignImages2
      }]
    }]
  }).then(results => {
    const { name, length, fundingNeeded, donationsMade, startDate, endDate } = results;
    const { contentId, contentStatus, createdDate, updatedAt, campaignText2s, campaignImages2s } = results.campaignContents[0];
    const campaignInfo = {
      campaignId,
      name,
      length,
      fundingNeeded,
      donationsMade,
      startDate,
      endDate
    };

    const contentInfo = {
      contentId,
      campaignId,
      contentStatus,
      createdDate,
      updatedAt
    };

    const campaignText = campaignText2s.reduce((parsedCampaignText, block) => {
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

    const campaignImages = campaignImages2s.reduce((cleanedImageData, block) => {
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
    const unsortedCampaignContent = [...campaignImages, ...campaignText];

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
  db.campaigns.update({ startDate: new Date() }, { where: { campaignId, nonprofitId, startDate: null, endDate: null } }).then(updateResults => success(updateResults)).catch(updateErr => error(updateErr));
};

const stopCampaign = exports.stopCampaign = (campaignId, nonprofitId, success, error) => {
  db.campaigns.update({ endDate: new Date() }, {
    where: {
      campaignId,
      nonprofitId,
      startDate: {
        $ne: null
      },
      endDate: null
    }
  }).then(updateResults => success(updateResults)).catch(updateErr => error(updateErr));
};

const updateCampaign = exports.updateCampaign = () => {
  // db.campaignContent.update(
  //   { status: 'previous' },
  //   { where: campaignId },
  // )
};

const createCampaign = exports.createCampaign = (nonprofitId, { name, fundingNeeded, length, content }, success, error) => {
  db.campaigns.create({
    nonprofitId,
    name,
    length,
    fundingNeeded
  }).then(newCampaign => {
    const { campaignId } = newCampaign;
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
      db.campaignText2.bulkCreate(blocks.text).then(() => {
        db.campaignImages2.bulkCreate(blocks.images).then(() => success({ message: `The campaign with the id ${campaignId} was successfully created.`, campaignId })).catch(createImagesErr => error({ message: 'There was an error creating the image content.', error: createImagesErr }));
      }).catch(createTextErr => error({ message: 'There was an error creating the text content.', error: createTextErr }));
    }).catch(createContentErr => error({ message: 'There was an error creating the content information.', error: createContentErr }));
  }).catch(createCampaignErr => error({ message: 'There was an error creating the campaign information.', error: createCampaignErr }));
};
//# sourceMappingURL=campaigns.js.map