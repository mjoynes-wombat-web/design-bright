/* eslint-env browser */
import React from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import Browse from './components/browse';
import Search from './components/search';

import './scss/style.scss';

class CampaignList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: '',
      view: '',
      search: '',
      sort: 'Newest',
      campaigns: '',
      showSort: false,
    };
  }

  componentWillMount() {
    const { search, sort } = queryString.parse(this.props.location.search);
    const { view, page } = this.props.match.params;
    const sortMethods = [ 'Newest', 'Percent Funded', 'Days Remaining', 'Funding Needed']

    const setSort = () => (sortMethods.indexOf(sort) !== -1 ? sort : sortMethods[0]);

    this.setState({
      view,
      page,
      search,
      sort: setSort(),
    });
    document.title = `${view.slice(0, 1).toUpperCase()}${view.slice(1, view.length)} Campaigns - Design Bright - Pg. ${page || 1}`;
  }

  render() {
    console.log(this.state);
    return (
      <main id="campaignList">
        {this.state.view === 'browse'
          ? <Browse
            state={this.state}
            showSortOpt={() => this.setState({ showSort: true })} />
          : null}
        {this.state.view === 'search'
          ? <Search
            state={this.state}
            showSortOpt={() => this.setState({ showSort: true })} />
          : null}
      </main>
    );
  }
}

export default CampaignList;
