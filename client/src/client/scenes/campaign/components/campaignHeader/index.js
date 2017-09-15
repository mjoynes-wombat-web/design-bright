/* eslint-env browser */
import React from 'react';

const determineTimeLeft = (isEnded, campaignInfo) => {
  if (isEnded()) {
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

const CampaignHeader = ({ campaignInfo, isEnded }) => (
  <div className="columns small-12">
    <section className="row">
      <div className="small-12 columns">
        <h1>
          <span className="underlined">
            {campaignInfo.name}
          </span>
        </h1>
      </div>
      <div className="small-12 columns">
        <div className="progress">
          <div className="line small-12 columns"></div>
          <div className="funded columns" style={{
            width: `${campaignInfo.donationPercentage < 100 ? campaignInfo.donationPercentage : 100}%`,
          }}></div>
        </div>
      </div>
      <div className="small-12 columns">
        <div className="row align-justify campaign-details">
          <div className="shrink columns">
            <p className="details">{campaignInfo.donationPercentage}% Funded</p>
          </div>
          <div className="shrink columns">
            <p className="details">
              {determineTimeLeft(isEnded, campaignInfo)}
            </p>
          </div>
          <div className="shrink columns">
            <p className="details">
              ${parseInt(campaignInfo.fundingNeeded, 10).toLocaleString()} Needed
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default CampaignHeader;
