import * as db from './db';

export const getCampaignContent = (campaignId, success, error) => {
  db.campaigns.find({
    where: { campaignId },
    include: [
      {
        model: db.campaignContent,
        where: {
          campaign_id: campaignId,
          content_status: 'current',
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
      const rawCampaignData = results;
      const rawContentData = results.campaign_contents[0];

      const campaignInfo = {
        campaignId: rawCampaignData.campaignId,
        name: rawCampaignData.name,
        length: rawCampaignData.length,
        fundingNeeded: rawCampaignData.fundingNeeded,
        donationsMade: rawCampaignData.donationsMade,
        startDate: rawCampaignData.startDate,
        endDate: rawCampaignData.endDate,
      };

      const contentInfo = {
        contentId: rawContentData.content_id,
        campaignId: rawContentData.campaign_id,
        contentStatus: rawContentData.content_status,
        createdDate: rawContentData.created_date,
        updatedDate: rawContentData.updatedAt,
      };

      const gatherCampaignText = (rawTextData) => {
        const textData = [];
        rawTextData.forEach((
          {
            text_id,
            content_id,
            content_position,
            text_type,
            text,
          },
        ) => {
          const textElement = {
            textId: text_id,
            contentId: content_id,
            contentPosition: content_position,
            textType: text_type,
            text,
          };
          textData.push(textElement);
        });
        return textData;
      };

      const gatherCampaignImages = (rawCampaignImages) => {
        const imageData = [];
        rawCampaignImages.forEach((
          {
            img_id,
            content_id,
            content_position,
            image_type,
            src,
            alt,
          },
        ) => {
          const imgElement = {
            imgId: img_id,
            contentId: content_id,
            contentPosition: content_position,
            imageType: image_type,
            src,
            alt,
          };
          imageData.push(imgElement);
        });
        return imageData;
      };

      const campaignText = gatherCampaignText(rawContentData.campaign_texts);
      const campaignImages = gatherCampaignImages(rawContentData.campaign_images);

      success({
        campaignInfo,
        contentInfo,
        campaignText,
        campaignImages,
      });
    })
    .catch(findErr => error(findErr));
};

export default null;
