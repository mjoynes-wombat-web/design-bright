/* eslint-env browser */
import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';

import DonateComponent from './components';

class Donate extends React.Component {
  constructor(props) {
    super(props);

    this.charge = this.charge.bind(this);
  }

  charge(token) {
    console.log(this.state);
    console.log(token);
  }

  render() {
    return (
      <StripeProvider apiKey='pk_test_KXQVwU6Pgt4ITIYPqFZTj6Oe'>
        <Elements>
          <DonateComponent
            cancelDonation={this.props.cancelDonation}
            campaignId={this.props.campaignId}
            campaignInfo={this.props.campaignInfo}
            isEnded={this.props.isEnded}
            onNewMessage={this.props.onNewMessage}
            onNewError={this.props.onNewError} />
        </Elements>
      </StripeProvider>
    );
  }
}

export default Donate;
