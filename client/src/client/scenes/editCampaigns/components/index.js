/* eslint-env browser */
import React from 'react';
import { Redirect } from 'react-router-dom';
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
      campaignInfo: {
        name: '',
        fundingNeeded: 100,
        length: 10,
      },
      contentInfo: {},
      campaignContent: [],
      fetched: false,
      hasCampaign: false,
      campaignId: '',
      valid: false,
      editorData: {},
    };
    this.componentWillMount = this.componentWillMount.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.onChangeEditorData = this.onChangeEditorData.bind(this);
  }

  componentWillMount() {
    if ('id' in this.props.match.params) {
      const editCampaignId = this.props.match.params.id;
      this.setState({ valid: true });

      axios.get(`https://${window.location.hostname}:3000/api/nonprofits/campaigns/${this.props.userAuth.accessToken}`)
        .then((results) => {
          this.setState({ campaigns: results.data.data.campaigns });
          this.setState({ nonprofitInfo: results.data.data.nonprofit });

          this.setState({ campaignId: editCampaignId });

          if (this.state.campaigns.find(
            campaign => campaign.campaignId === parseInt(editCampaignId, 10))
          ) {
            this.setState({ hasCampaign: true });

            axios.get(`https://${window.location.hostname}:3000/api/campaigns/${editCampaignId}`)
              .then((campaignResults) => {
                const { campaignContent } = campaignResults.data.data;
                const campaignInfo = campaignResults.data.data.campaignInfo;

                document.title = `Edit ${campaignInfo.name} Campaign - Design Bright`;

                this.setState({ campaignInfo });
                this.setState({
                  contentInfo: results.data.data.contentInfo,
                });
                this.setState({ campaignContent });
                this.setState({ fetched: true });
              })
              .catch(error => console.log(error));
          } else {
            this.setState({ hasCampaign: false });
            this.setState({ fetched: true });
          }
        })
        .catch(error => console.log(error));
    } else {
      this.setState({
        fetched: true,
        hasCampaign: true,
      });
    }
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
    const accessToken = this.props.userAuth.accessToken;
    if (this.state.campaignContent.length > 0) {
      axios.patch(
        `https://${window.location.hostname}:3000/api/campaigns/edit/${this.state.campaignInfo.campaignId}`,
        {
          updatedCampaign: this.state.editorData,
          accessToken,
        },
      );
    } else {
      axios.post(
        `https://${window.location.hostname}:3000/api/campaigns/create`,
        {
          newCampaign: {
            ...this.state.campaignInfo,
            content: this.state.editorData,
          },
          accessToken,
        },
      );
    }
  }

  onChangeEditorData(editorData) {
    this.setState(
      { editorData },
      () => {
        if (this.validate()) {
          this.setState({ valid: true });
        } else {
          this.setState({ valid: false });
        }
      },
    );
  }

  validate() {
    if (
      this.state.campaignInfo.name.length > 0
      && (isNumber(this.state.campaignInfo.length)
        && numLength(this.state.campaignInfo.length, 2, 2))
      && (isNumber(this.state.campaignInfo.fundingNeeded)
        && numLength(this.state.campaignInfo.fundingNeeded, 3, 6))
      && this.state.editorData.document.nodes[0].nodes[0].ranges[0].text !== ''
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
                          campaignId={this.state.campaignId}
                          onChangeEditorData={this.onChangeEditorData} />
                      </div>
                    </div>
                    <div className="row align-center">
                      <button
                        className={`primary small-11 medium-10 large-8 columns${this.state.valid ? '' : ' disabled'}`}
                        disabled={!this.state.valid}
                        type="submit"
                        onClick={this.onSubmit}>
                        {this.state.campaignContent.length > 0
                          ? 'Save Changes'
                          : 'Create Campaign'}
                      </button>
                      <span className='error small-12'>
                        Please make sure you've entered all your information.
                      </span>
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
