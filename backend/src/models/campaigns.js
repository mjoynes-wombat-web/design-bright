import * as db from './db';

export const getCampaignContent = (campaignId, success, error) => {
  db.campaigns.find({
    where: { campaignId },
    include: [
      {
        model: db.campaignContent,
        where: {
          campaignId,
          contentStatus: 'current',
        },
        include: [
          {
            model: db.campaignText,
          },
          {
            model: db.campaignImages,
          },
        ],
      },
    ],
  })
    .then((results) => {
      const { name, length, fundingNeeded, donationsMade, startDate, endDate } = results;
      const {
        contentId,
        contentStatus,
        createdDate,
        updatedAt,
        campaignTexts,
        campaignImages } = results.campaignContents[0];
      const campaignInfo = {
        campaignId,
        name,
        length,
        fundingNeeded,
        donationsMade,
        startDate,
        endDate,
      };

      const contentInfo = {
        contentId,
        campaignId,
        contentStatus,
        createdDate,
        updatedAt,
      };

      const campaignTextBlocks = campaignTexts.reduce(
        (parsedCampaignText, block) => {
          const parsedBlock = {
            textId: block.textId,
            contentId: block.contentId,
            position: block.position,
            kind: block.kind,
            isVoid: block.isVoid,
            type: block.type,
            nodes: JSON.parse(block.nodes),
            createdAt: block.createdAt,
            updatedAt: block.updatedAt,
          };
          parsedCampaignText.push(parsedBlock);
          return parsedCampaignText;
        },
        [],
      );

      const campaignImagesBlocks = campaignImages.reduce(
        (cleanedImageData, block) => {
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
              imageType: block.imageType,
            },
            createdAt: block.createdAt,
            updatedAt: block.updatedAt,
          };

          cleanedImageData.push(cleanedBlock);
          return cleanedImageData;
        },
        [],
      );
      const unsortedCampaignContent = [
        ...campaignImagesBlocks,
        ...campaignTextBlocks,
      ];
      const campaignContent = unsortedCampaignContent.sort(
        (a, b) => a.position - b.position);
      success({
        campaignInfo,
        contentInfo,
        campaignContent,
      });
    })
    .catch(findErr => error(findErr));
};

export const getNonprofitsCampaigns = (nonprofitId, success, error) => {
  db.campaigns.findAll({
    where: { nonprofitId },
  })
    .then((findResults) => {
      const campaigns = [];
      for (let i = 0; i < findResults.length; i += 1) {
        campaigns.push(findResults[i].dataValues);
      }
      success(campaigns);
    })
    .catch(findErr => error(findErr));
};

export const launchCampaign = (campaignId, nonprofitId, success, error) => {
  db.campaigns.update(
    { startDate: new Date() },
    { where: { campaignId, nonprofitId, startDate: null, endDate: null } },
  )
    .then(updateResults => success(updateResults))
    .catch(updateErr => error(updateErr));
};

export const stopCampaign = (campaignId, nonprofitId, success, error) => {
  db.campaigns.update(
    { endDate: new Date() },
    {
      where: {
        campaignId,
        nonprofitId,
        startDate: {
          $ne: null,
        },
        endDate: null,
      },
    },
  )
    .then(updateResults => success(updateResults))
    .catch(updateErr => error(updateErr));
};

export const updateCampaign = () => {
  // db.campaignContent.update(
  //   { status: 'previous' },
  //   { where: campaignId },
  // )
};

export const createCampaign = (
  nonprofitId,
  { name, fundingNeeded, length, content },
  success,
  error) => {
  db.campaigns.create(
    {
      nonprofitId,
      name,
      length,
      fundingNeeded,
    },
  )
    .then((newCampaign) => {
      const { campaignId } = newCampaign;
      db.campaignContent.create(
        {
          campaignId,
          contentStatus: 'current',
          createdDate: new Date(),
        },
      )
        .then((newContent) => {
          const contentId = newContent.contentId;
          const rawContent = content.document.nodes;

          const blocks = rawContent.reduce((formattedBlocks, block, index) => {
            const newBlocks = formattedBlocks;
            const formattedBlock = {
              contentId,
              position: index + 1,
              kind: block.kind,
              isVoid: block.isVoid,
              type: block.type,
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
          },
          {
            text: [],
            images: [],
          },
          );
          db.campaignText.bulkCreate(
            blocks.text,
          )
            .then(() => {
              db.campaignImages.bulkCreate(
                blocks.images,
              )
                .then(() => success({ message: `The campaign with the id ${campaignId} was successfully created.`, campaignId }))
                .catch(createImagesErr => error({ message: 'There was an error creating the image content.', error: createImagesErr }));
            })
            .catch(createTextErr => error({ message: 'There was an error creating the text content.', error: createTextErr }));
        })
        .catch(createContentErr => error({ message: 'There was an error creating the content information.', error: createContentErr }));
    })
    .catch(createCampaignErr => error({ message: 'There was an error creating the campaign information.', error: createCampaignErr }));
};
