/* eslint-env browser */
import React from 'react';
import { Redirect } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

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
      campaigns: {},
      showSort: false,
    };
  }

  componentWillMount() {
    const { search, sort } = queryString.parse(this.props.location.search);
    const { view, page } = this.props.match.params;
    const sortMethods = ['Newest', 'Percent Funded', 'Days Remaining', 'Funding Needed'];

    const setSort = () => (sortMethods.indexOf(sort) === -1 ? sortMethods[0] : sort);

    const setPage = () => (Number.isInteger(parseInt(page, 10)) ? parseInt(page, 10) : 1);

    this.setState({
      view,
      page: setPage(),
      search,
      sort: setSort(),
    });
    document.title = `${view.slice(0, 1).toUpperCase()}${view.slice(1, view.length)} Campaigns - Design Bright - Pg. ${page || 1}`;

    const getUrl = () => {
      if (view === 'search') {
        return `?page=${setPage()}&search=${search}&sort=${setSort()}`;
      }
      return `?page=${setPage()}&sort=${setSort()}`;
    };

    axios.get(`https://${window.location.hostname}:3000/api/campaigns/${getUrl()}`)
      .then(getCampaignsResults => console.log(getCampaignsResults))
      .catch(getCampaignsErr => console.log(getCampaignsErr));
  }

  render() {
    if (['search', 'browse'].indexOf(this.state.view) === -1) {
      if (this.state.search) {
        return <Redirect to={{
          pathname: '/campaigns/search',
          search: `?search=${this.state.search}&sort=${this.state.sort}`,
        }} />;
      }
      return <Redirect to={{
        pathname: '/campaigns/browse',
        search: `?sort=${this.state.sort}`,
      }} />;
    }
    return (
      <main id="campaignList">
        {this.state.view === 'browse'
          ? <Browse
            state={this.state}
            showSortOpt={() => this.setState({ showSort: true })}
            cancelSort={() => this.setState({ showSort: false })} />
          : null}
        {this.state.view === 'search'
          ? <Search
            state={this.state}
            showSortOpt={() => this.setState({ showSort: true })}
            cancelSort={() => this.setState({ showSort: false })} />
          : null}
      </main>
    );
  }
}

export default CampaignList;
