/* eslint-env browser */
import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import CampaignEditor from './editor';

import './scss/style.scss';

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
        duration: 10,
      },
      contentInfo: {},
      campaignContent: [],
      fetched: false,
      hasCampaign: false,
      campaignId: null,
      valid: false,
      editorData: {},
    };
    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validate = this.validate.bind(this);
    this.onChangeEditorData = this.onChangeEditorData.bind(this);
  }

  componentWillMount() {
    if ('id' in this.props.match.params) {
      const editCampaignId = parseInt(this.props.match.params.id, 10);
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

            axios.get(`https://${window.location.hostname}:3000/api/campaigns/${editCampaignId}?accessToken=${this.props.userAuth.accessToken}`)
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

  componentDidMount() {
    this.validate();
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
          campaignInfo: this.state.campaignInfo,
          campaignContent: this.state.editorData,
          accessToken,
        },
      )
        .then((results) => {
          window.scrollTo(0, 0);
          this.props.onNewMessage(results.data.message);
        })
        .catch((error) => {
          window.scrollTo(0, 0);
          this.props.onNewError(error.response.data.message);
        });
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
      )
        .then((results) => {
          window.scrollTo(0, 0);
          this.props.onNewMessage(results.data.message);
        })
        .catch((error) => {
          window.scrollTo(0, 0);
          this.props.onNewError(error.response.data.message);
        });
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
    if (this.state.campaignInfo.startDate) {
      if (this.state.editorData.document.nodes[0].nodes[0].ranges[0].text !== '') {
        return true;
      }
    } else if (
      this.state.campaignInfo.name.length > 0
      && (isNumber(this.state.campaignInfo.duration)
        && numLength(this.state.campaignInfo.duration, 2, 2))
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
                    <div className="row header">
                      <h1 className="small-12 columns">
                        <span className="underlined">
                          {this.state.campaignContent.length > 0
                            ? `Edit ${this.state.campaignInfo.name}'s Campaign`
                            : `Create ${this.state.campaignInfo.name
                              ? `${this.state.campaignInfo.name}'s`
                              : ''} Campaign`}
                        </span>
                      </h1>
                      {this.state.campaignInfo.startDate
                        ? (
                          <p className="message small-12 columns">
                            {this.state.campaignInfo.endDate
                              ? 'This campaign has already ended so only it\'s content can be modified.'
                              : 'This campaign has already started so only it\'s content can be modified.'}
                          </p>
                        )
                        : null}
                    </div>
                    <div className="row">
                      {this.state.campaignInfo.startDate
                        ? (
                          <div className="small-12 large-5 columns">
                            <p className="title">Campaign Name:</p>
                            <p className="info">{this.state.campaignInfo.name}</p>
                            <p className="title">Campaign Duration:</p>
                            <p className="info">{this.state.campaignInfo.duration} Days</p>
                            <p className="title">Funding Needed:</p>
                            <p className="info">${this.state.campaignInfo.fundingNeeded}</p>
                            <p className="title">Start Date:</p>
                            <p className="info">
                              {(new Date(
                                Date.parse(this.state.campaignInfo.startDate),
                              ))
                                .toLocaleDateString()}
                            </p>
                            {this.state.campaignInfo.endDate
                              ? (
                                <div>
                                  <p className="title">End Date:</p>
                                  <p className="info">
                                    {(new Date(
                                      Date.parse(this.state.campaignInfo.endDate),
                                    ))
                                      .toLocaleDateString()}
                                  </p>
                                </div>
                              )
                              : null}
                          </div>
                        )
                        : (
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
                              htmlFor="duration"
                              className={`row${(isNumber(this.state.campaignInfo.duration) && numLength(this.state.campaignInfo.duration, 2, 2)) ? '' : ' invalid'}`}>
                              <div className="small-12 columns">
                                Campaign Duration (Days): <span className="required">*</span>
                              </div>
                              <div className="small-12 columns">
                                <span className="error">
                                  The campaign duration must be between 10 and 99 days.
                                </span>
                              </div>
                            </label>
                            <input
                              value={this.state.campaignInfo.duration}
                              onChange={this.onChange}
                              type="number"
                              name="duration"
                              id="campaignDuration"
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
                        )}
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
          pathname: '/user/profile',
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
