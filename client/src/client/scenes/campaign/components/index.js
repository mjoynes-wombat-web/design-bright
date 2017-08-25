/* eslint-env browser */
import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import queryString from 'query-string';

import './scss/style.scss';

class Campaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetched: false,
    };

    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    console.log(this.props.routeParams);
  }

  render() {
    this.setState({ fetched: true });
    if (this.state.fetched) {
      return (
        <main id="campaign" className="small-12 columns">
          <section className="row align-center">
            <div className="small-12 columns">
              <h1>
                <span className="underlined">
                  Homes for Veterans' Website
                </span>
              </h1>
            </div>
          </section>
        </main>
      );
    }
    return (
      <h1>Loading</h1>
    );
  }
}

export default Campaign;
