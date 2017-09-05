/* eslint-env browser */
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import CampaignEditor from './editor';

import './scss/style.scss';
import './scss/draft.css';

const isNumber = (num) => {
  const numbers = String(num).match('[0-9]+');
  if (numbers) {
    return numbers[0] === String(num);
  }
  return false;
};
const numLength = (num, minLength, maxLength) =>
  String(num).length >= minLength && String(num).length <= maxLength;

class mngCampaigns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nonprofitInfo: {},
      campaigns: {},
      campaignInfo: {},
      contentInfo: {},
      campaignContent: [],
      fetched: false,
      hasCampaign: false,
      campaignId: '',
      valid: false,
    };

    this.componentWillMount = this.componentWillMount.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentWillMount() {
    axios.get(`https://${window.location.hostname}:3000/api/nonprofits/campaigns/${this.props.userAuth.accessToken}`)
      .then((results) => {
        this.setState({ campaigns: results.data.data.campaigns });
        this.setState({ nonprofitInfo: results.data.data.nonprofit });

        const editCampaignId = this.props.match.params.id;

        this.setState({ campaignId: editCampaignId });

        if (this.state.campaigns.find(
          campaign => campaign.campaignId === parseInt(editCampaignId, 10))
        ) {
          this.setState({ hasCampaign: true });

          axios.get(`https://${window.location.hostname}:3000/api/campaigns/${editCampaignId}`)
            .then((campaignResults) => {
              const unsortedCampaignContent = [
                ...campaignResults.data.data.campaignImages,
                ...campaignResults.data.data.campaignText,
              ];

              const campaignContent = () =>
                unsortedCampaignContent.sort(
                  (a, b) => a.contentPosition - b.contentPosition,
                );

              const campaignInfo = campaignResults.data.data.campaignInfo;

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
        } else {
          this.setState({ hasCampaign: false });
          this.setState({ fetched: true });
        }
      })
      .catch(error => console.log(error));
  }

  onChange(e) {
    const target = e.target;
    const name = target.name;
    let value;

    if (name === 'fundingNeeded') {
      value = target.value.replace(/\.|,|[^0-9.]/g, '');
      if (value === '') {
        value = 100;
      }
    } else {
      value = target.type === 'checkbox' ? target.checked : target.value;
    }

    const campaignInfo = this.state.campaignInfo;
    campaignInfo[name] = value;
    this.setState(
      { campaignInfo },
      () => {
        if (this.validate()) {
          this.setState({ valid: true });
        } else {
          this.setState({ valid: false });
        }
      },
    );
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state.campaignName);
  }

  validate() {
    if (
      this.state.campaignInfo.name.length > 0
      && (isNumber(this.state.campaignInfo.length)
        && numLength(this.state.campaignInfo.length, 2, 2))
      && (isNumber(this.state.campaignInfo.fundingNeeded)
        && numLength(this.state.campaignInfo.fundingNeeded, 3, 6))
    ) {
      return true;
    }
    return false;
  }

  render() {
    if (this.props.onRequireAuth()) {
      if (this.props.userInfo.userType === 'non-profit') {
        if (this.state.fetched) {
          if (this.state.hasCampaign) {
            return (
              <main id="editCampaigns" className={`small-12 columns${('ontouchstart' in document.documentElement) ? '' : ' no-touch'}`}>
                <section className="row align-center">
                  <form className="small-12 columns" onSubmit={this.onSubmit}>
                    <div className="row">
                      <h1 className="small-12 columns">
                        <span className="underlined">
                          Edit {this.state.campaignInfo.name} Campaign
                        </span>
                      </h1>
                    </div>
                    <div className="row">
                      <div className="small-12 large-5 columns">
                        <label htmlFor="name">
                          Campaign Name: <span className="required">*</span>
                        </label>
                        <input
                          value={this.state.campaignInfo.name}
                          onChange={this.onChange}
                          type="text"
                          name="name"
                          id="campaignName"
                          required />
                        <label
                          htmlFor="length"
                          className={`row${(isNumber(this.state.campaignInfo.length) && numLength(this.state.campaignInfo.length, 2, 2)) ? '' : ' invalid'}`}>
                          <div className="small-12 columns">
                            Campaign Length (Days): <span className="required">*</span>
                          </div>
                          <div className="small-12 columns">
                            <span className="error">
                              The campaign length must be between 10 and 99 days.
                            </span>
                          </div>
                        </label>
                        <input
                          value={this.state.campaignInfo.length}
                          onChange={this.onChange}
                          type="number"
                          name="length"
                          id="campaignLength"
                          required />
                        <label
                          htmlFor="fundingNeeded"
                          className={`row${(isNumber(this.state.campaignInfo.fundingNeeded) && numLength(this.state.campaignInfo.fundingNeeded, 3, 6)) ? '' : ' invalid'}`}>
                          <div className="small-12 columns">
                            Funding Needed: <span className="required">*</span>
                          </div>
                          <div className="small-12 columns">
                            <span className="error">
                              Funding must be more than $100 but less than $1,000,000.
                            </span>
                          </div>
                        </label>
                        <input
                          value={`$${parseInt(this.state.campaignInfo.fundingNeeded, 10).toLocaleString()}`}
                          onChange={this.onChange}
                          type="text"
                          name="fundingNeeded"
                          id="campaignFunding"
                          required />
                      </div>
                      <div className="small-12 large-7 columns">
                        <label htmlFor="campaignEditor">
                          Campaign Content: <span className="required">*</span>
                        </label>
                        <CampaignEditor
                          content={this.state.campaignContent}
                          campaignInfo={this.state.campaignInfo}
                          nonprofitInfo={this.state.nonprofitInfo}
                          campaignId={this.state.campaignId} />
                      </div>
                    </div>
                  </form>
                </section>
              </main >
            );
          }
          return (
            <Redirect to={{
              pathname: '/manage-campaigns',
              search: '?origin=not-auth-to-edit',
            }} />
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
