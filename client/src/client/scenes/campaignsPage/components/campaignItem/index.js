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

const CampaignItem = ({ campaign }) => {
  return (
    <article className="small-12 medium-6 columns campaign-item">
      <Link to={`/campaign/${campaign.campaignId}`}>
        <div className="row">
          <div className="small-12 columns  align-self-top">
            <div className="row align-justify align-middle">
              <h2 className="columns">
                <span className="underlined">
                  {campaign.name}
                </span>
              </h2>
              <p className="days shrink columns">
                <span className="details">
                  {determineTimeLeft(campaign)}
                </span>
              </p>
              <p className="small-12 columns">
                {campaign.description}
              </p>
            </div>
          </div>
          <div className="small-12 columns align-self-bottom">
            <div className="row align-justify">
              <div className="main-image small-12 columns">
                <img src={campaign.image.src} alt={campaign.image.alt} />
              </div>
              <div className="small-12 columns">
                <div className="progress">
                  <div className="line small-12 columns"></div>
                  <div className="funded columns" style={{
                    width: `${percentFunded(campaign.fundingNeeded, campaign.donationsMade) < 100
                      ? percentFunded(campaign.fundingNeeded, campaign.donationsMade)
                      : 100}%`,
                  }}></div>
                </div>
              </div>
              <p className="funded shrink columns">
                <span className="details">
                  {percentFunded(campaign.fundingNeeded, campaign.donationsMade)}% Funded
                </span>
              </p>
              <p className="funding shrink columns">
                <span className="details">
                  ${campaign.fundingNeeded} Needed
                </span>
              </p>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default CampaignItem;
