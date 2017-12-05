/* eslint-env browser */
import React from 'react';
import { Link } from 'react-router-dom';

import './scss/style.scss';

const determineTimeLeft = (campaignInfo) => {
  const isEnded = endDate => ((new Date(Date.parse(endDate))).getTime()
    <= (new Date()).getTime());
  const campaign = campaignInfo;
  campaign.timeRemaining = (
    (((new Date(Date.parse(campaign.startDate)) - new Date())
      / 1000 / 60 / 60 / 24) + campaign.duration)
  );

  if (isEnded(campaignInfo.endDate)) {
    return 'This campaign has ended.';
  } else if (campaignInfo.startDate === null) {
    return 'This campaign hasn\'t started yet.';
  } else if (campaignInfo.timeRemaining > 1) {
    return `${Math.round(campaignInfo.timeRemaining)} Days Left`;
  } else if ((campaignInfo.timeRemaining * 24) > 1) {
    return `${Math.round(campaignInfo.timeRemaining * 24)} Hours Left`;
  }
  return 'Less than an Hour left';
};

const percentFunded = (fundingNeeded, donationsMade) =>
  Math.round((parseFloat(donationsMade, 2) / parseFloat(fundingNeeded)) * 100);

const CampaignItem = ({ campaign }) => (
  <article className="campaign-item">
    <Link to={`/campaign/${campaign.campaignId}`}>
      <div className="campaign-heading">
        <h2>
          <span className="underlined">
            {campaign.name}
          </span>
        </h2>
        <p className="days">
          <span className="details">
            {determineTimeLeft(campaign)}
          </span>
        </p>
      </div>
      <p className="campaign-description">
        {campaign.description}
      </p>
      <div className="main-image">
        <img src={campaign.image.src} alt={campaign.image.alt} />
      </div>
      <div className="progress">
        <div className="line"></div>
        <div className="funded" style={{
          width: `${percentFunded(campaign.fundingNeeded, campaign.donationsMade) < 100
            ? percentFunded(campaign.fundingNeeded, campaign.donationsMade)
            : 100}%`,
        }}></div>
      </div>
      <div className="campaign-details">
        <p className="funded">
          <span className="details">
            {percentFunded(campaign.fundingNeeded, campaign.donationsMade)}% Funded
          </span>
        </p>
        <p className="funding">
          <span className="details">
            ${campaign.fundingNeeded} Needed
          </span>
        </p>
      </div>
    </Link>
  </article>
);

export default CampaignItem;
