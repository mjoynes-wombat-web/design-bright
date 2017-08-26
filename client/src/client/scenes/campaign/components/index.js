/* eslint-env browser */
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import './scss/style.scss';

const formatCampaignContent = (buttonAction, content, i) => {
  if ('text' in content) {
    switch (content.textType) {
      case 'p':
        return <p key={i}>{content.text}</p>;
      case 'h2':
        return (
          <h2 key={i}>
            <span className="underlined">
              {content.text}
            </span>
          </h2>
        );
      default:
        return null;
    }
  } else if ('src' in content) {
    if (content.imageType === 'main') {
      return (
        <div key={i}>
          <div className="main-image-wrapper">
            <div className="overlay"></div>
            <div className="main-image">
              <img
                src={content.src}
                alt={content.alt}
                className={content.imageType} />
            </div>
            <button className="secondary" onClick={buttonAction}>Make a Donation</button>
          </div>
          <button className="primary mobile" onClick={buttonAction}>
            Make a Donation
          </button>
        </div>
      );
    } else if (content.imageType === 'left') {
      return (
        <img
          src={content.src}
          alt={content.alt}
          className={content.imageType}
          key={i} />
      );
    }
  }
  return null;
};

class Campaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {},
      contentInfo: {},
      campaignContent: [],
      fetched: false,
    };

    this.componentWillMount = this.componentWillMount.bind(this);
    this.makeDonation = this.makeDonation.bind(this);
  }

  componentWillMount() {
    axios.get(`https://${window.location.hostname}:3000/api/campaigns/${this.props.match.params.id}`)
      .then((results) => {
        const unsortedCampaignContent = [
          ...results.data.data.campaignImages,
          ...results.data.data.campaignText,
        ];

        const campaignContent = () =>
          unsortedCampaignContent.sort(
            (a, b) => a.contentPosition - b.contentPosition,
          );

        const campaignInfo = results.data.data.campaignInfo;

        campaignInfo.timeRemaining = (
          (new Date(Date.parse(campaignInfo.endDate)) - new Date())
          / 1000 / 60 / 60 / 24
        );

        this.setState({ campaignInfo });
        this.setState({
          contentInfo: results.data.data.contentInfo,
        });
        this.setState({ campaignContent: campaignContent() });
        this.setState({ fetched: true });
      })
      .catch(error => console.log(error));
  }

  determineTimeLeft() {
    if (this.state.campaignInfo.timeRemaining > 1) {
      return `${Math.round(this.state.campaignInfo.timeRemaining)} Days Left`;
    } else if ((this.state.campaignInfo.timeRemaining * 24) > 1) {
      return `${Math.round(this.state.campaignInfo.timeRemaining * 24)} Hours Left`;
    }
    return 'Less than an Hour left';
  }

  makeDonation() {
    console.log(`Make donation for Campaign ${this.state.campaignInfo.campaignId}`);
  }

  render() {
    if (this.state.fetched) {
      return (
        <main id="campaign" className={`small-12 columns${('ontouchstart' in document.documentElement) ? '' : ' no-touch'}`}>
          <section className="row">
            <div className="small-12 columns">
              <h1>
                <span className="underlined">
                  {this.state.campaignInfo.name}
                </span>
              </h1>
            </div>
            <div className="small-12 columns">
              <div className="progress">
                <div className="line small-12 columns"></div>
                <div className="funded columns" style={{ width: `calc(${(((parseFloat(this.state.campaignInfo.donationsMade) / parseFloat(this.state.campaignInfo.fundingNeeded)) * 100) < 100) ? ((parseFloat(this.state.campaignInfo.donationsMade) / parseFloat(this.state.campaignInfo.fundingNeeded)) * 100) : '100'}% - 0.25rem)` }}></div>
              </div>
            </div>
            <div className="small-12 columns">
              <div className="row align-justify campaign-details">
                <div className="shrink columns">
                  <p className="details">{`${(((parseFloat(this.state.campaignInfo.donationsMade) / parseFloat(this.state.campaignInfo.fundingNeeded)) * 100) < 100) ? Math.round((parseFloat(this.state.campaignInfo.donationsMade) / parseFloat(this.state.campaignInfo.fundingNeeded)) * 100) : '100'}`}% Funded</p>
                </div>
                <div className="shrink columns">
                  <p className="details">
                    {this.determineTimeLeft()}
                  </p>
                </div>
                <div className="shrink columns">
                  <p className="details">${parseInt(this.state.campaignInfo.fundingNeeded, 10).toLocaleString()} Needed</p>
                </div>
              </div>
            </div>
            <div className="small-12 columns">
              <section className="campaign-content row">
                <div className="small-12 medium-6 columns">
                  {this.state.campaignContent.map(
                    (content, i) => (
                      (i < ((this.state.campaignContent.length / 2) - 1))
                        ? formatCampaignContent(this.makeDonation, content, i)
                        : null
                    ),
                  )}
                </div>
                <div className="small-12 medium-6 columns">
                  {this.state.campaignContent.map(
                    (content, i) => ((i > ((this.state.campaignContent.length / 2) - 2))
                      ? formatCampaignContent(this.makeDonation, content, i)
                      : null
                    ),
                  )}
                </div>
                <div className="small-12 columns">
                  <div className="row align-center">
                    <button
                      className="primary small-11 medium-10 large-10 columns"
                      onClick={this.makeDonation}>
                      Make a Donation
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </section>
        </main >
      );
    }
    return (
      <h1>Loading</h1>
    );
  }
}

export default Campaign;
