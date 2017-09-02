/* eslint-env browser */
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

import './scss/style.scss';
import CampaignActions from './campaignActions';

class mngCampaigns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nonprofitInfo: {},
      campaigns: {},
      fetched: false,
    };

    this.componentWillMount = this.componentWillMount.bind(this);
    this.launchCampaign = this.launchCampaign.bind(this);
    this.stopCampaign = this.stopCampaign.bind(this);
  }

  componentWillMount() {
    axios.get(`https://${window.location.hostname}:3000/api/nonprofits/campaigns/${this.props.userAuth.accessToken}`)
      .then((results) => {
        this.setState({ campaigns: results.data.data.campaigns });
        this.setState({ nonprofitInfo: results.data.data.nonprofit });
        this.setState({ fetched: true });
      })
      .catch(error => console.log(error));
  }

  launchCampaign(campaignId) {
    const accessToken = this.props.userAuth.accessToken;
    axios.patch(
      `https://${window.location.hostname}:3000/api/nonprofits/campaigns/launch/${campaignId}`,
      { accessToken },
    )
      .then((results) => {
        if (results.status === 200) {
          const campaigns  = this.state.campaigns;
          const campaignPosition = campaigns
            .map(campaign => campaign.campaignId)
            .indexOf(campaignId);
          const date = new Date();
          campaigns[campaignPosition].startDate = date.toISOString();
          this.setState({ campaigns });
        }
      })
      .catch(error => console.log(error));
  }

  stopCampaign(campaignId) {
    const accessToken = this.props.userAuth.accessToken;
    axios.patch(
      `https://${window.location.hostname}:3000/api/nonprofits/campaigns/stop/${campaignId}`,
      { accessToken },
    )
      .then((results) => {
        if (results.status === 200) {
          const campaigns  = this.state.campaigns;
          const campaignPosition = campaigns
            .map(campaign => campaign.campaignId)
            .indexOf(campaignId);
          const date = new Date();
          campaigns[campaignPosition].endDate = date.toISOString();
          this.setState({ campaigns });
        }
      })
      .catch(error => console.log(error));
  }

  render() {
    if (this.props.onRequireAuth()) {
      if (this.props.userInfo.userType === 'non-profit') {
        if (this.state.fetched) {
          return (
            <main id="mngCampaigns" className={`small-12 columns${('ontouchstart' in document.documentElement) ? '' : ' no-touch'}`}>
              <section className="row">
                <div className="small-12 columns">
                  <h1>
                    <span className="underlined">
                      {this.state.nonprofitInfo.name}'s Campaigns
                    </span>
                  </h1>
                </div>
                {this.state.campaigns.map(
                  (campaign, i) => <CampaignActions
                    name={campaign.name}
                    id={campaign.campaignId}
                    key={i}
                    launch={this.launchCampaign}
                    stop={this.stopCampaign}
                    startDate={campaign.startDate}
                    endDate={campaign.endDate} />,
                )}
              </section>
            </main >
          );
        }
        return (
          <h1>Loading</h1>
        );
      }
      return (
        <Redirect to={{
          pathname: '/profile',
          search: '?origin=nonprofit-page',
        }} />
      );
    }
    return (
      <Redirect to={{
        pathname: '/login',
        search: '?origin=secure',
      }} />
    );
  }
}

export default mngCampaigns;
