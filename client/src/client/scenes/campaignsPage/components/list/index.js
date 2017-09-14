/* eslint-env browser */
import React from 'react';
import axios from 'axios';

import CampaignItem from '../campaignItem';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: {},
      fetched: false,
    };

    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    axios.get(`https://${window.location.hostname}:3000/api/campaigns/${this.props.getUrl}`)
      .then(getCampaignsResults => this.setState({
        campaigns: getCampaignsResults.data.data.campaigns,
        fetched: true,
      }))
      .catch(getCampaignsErr => console.log(getCampaignsErr));
  }

  render() {
    if (this.state.fetched) {
      console.log(this.state.campaigns);
      return (
        <section className="row" id="campaignsList">
          {this.state.campaigns.map(
            (campaign, i) => <CampaignItem
              campaign={campaign} key={i} />,
          )}
        </section>
      );
    }
    return (
      <section className="row" id="campaignsList">
        <h2 className="small-12 columns" id="List">Loading</h2>
      </section>
    );
  }
}

export default List;
