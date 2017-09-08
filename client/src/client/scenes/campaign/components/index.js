/* eslint-env browser */
import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import CampaignBlocks from './campaignBlocks';

import './scss/style.scss';

class Campaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {},
      contentInfo: {},
      campaignContent: [],
      fetched: {
        complete: false,
        code: null,
      },
    };

    this.componentWillMount = this.componentWillMount.bind(this);
    this.makeDonation = this.makeDonation.bind(this);
  }

  componentWillMount() {
    const campaignId = this.props.match.params.id;
    this.setState({ campaignId });

    axios.get(`https://${window.location.hostname}:3000/api/campaigns/${campaignId}`)
      .then((campaignResults) => {
        const { campaignInfo, campaignContent } = campaignResults.data.data;
        campaignInfo.timeRemaining = (
          (((new Date(Date.parse(campaignInfo.startDate)) - new Date())
            / 1000 / 60 / 60 / 24) + campaignInfo.length)
        );

        this.setState({ campaignInfo });
        this.setState({ campaignContent });

        document.title = `${campaignInfo.name} Campaign - Design Bright`;

        this.setState({
          fetched: {
            complete: true,
            status: campaignResults.data.statusCode,
          },
        });
      })
      .catch(error => this.setState({
        fetched: {
          complete: true,
          status: error.response.data.statusCode,
        },
      }));
  }

  determineTimeLeft() {
    if (this.state.campaignInfo.endDate) {
      return 'This campaign has ended.';
    }

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
    if (this.state.fetched.complete) {
      if (this.state.campaignInfo.startDate) {
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
                    <p className="details">
                      ${parseInt(this.state.campaignInfo.fundingNeeded, 10).toLocaleString()} Needed
                    </p>
                  </div>
                </div>
              </div>
              <div className="small-12 columns">
                <section className="campaign-content row">
                  <div className="small-12 medium-6 columns">
                    {this.state.campaignContent.map(
                      (content, i) => (
                        (i < ((this.state.campaignContent.length / 2) - 1))
                          ? <CampaignBlocks
                            campaignInfo={this.state.campaignInfo}
                            buttonAction={this.makeDonation}
                            content={content}
                            key={i} />
                          : null
                      ),
                    )}
                  </div>
                  <div className="small-12 medium-6 columns">
                    {this.state.campaignContent.map(
                      (content, i) => ((i > ((this.state.campaignContent.length / 2) - 2))
                        ? <CampaignBlocks
                          campaignInfo={this.state.campaignInfo}
                          buttonAction={this.makeDonation}
                          content={content}
                          key={i} />
                        : null
                      ),
                    )}
                  </div>
                  <div className="small-12 columns">
                    <div className="row align-center">
                      <button
                        className={`primary small-11 medium-10 large-10 columns${this.state.campaignInfo.endDate ? ' disabled' : ''}`}
                        onClick={this.makeDonation}
                        disabled={this.state.campaignInfo.endDate}>
                        {this.state.campaignInfo.endDate
                          ? 'This campaign has ended.'
                          : 'Make a Donation'}
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
        <Redirect to={{
          pathname: '/campaigns',
          search: '?origin=invalid-campaign',
        }} />
      );
    }
    return (
      <h1>Loading</h1>
    );
  }
}

export default Campaign;
