/* eslint-env browser */
import React from 'react';
import { StripeProvider, Elements } from 'react-stripe-elements';

import DonateComponent from './components';

const Donate = ({
  userInfo,
  cancelDonation,
  campaignId,
  campaignInfo,
  isEnded,
  onNewMessage,
  updateCampaignDonations,
  onNewError,
}) => (
  <StripeProvider apiKey='pk_test_KXQVwU6Pgt4ITIYPqFZTj6Oe'>
    <Elements>
      <DonateComponent
        userInfo={userInfo}
        cancelDonation={cancelDonation}
        campaignId={campaignId}
        campaignInfo={campaignInfo}
        isEnded={isEnded}
        onNewMessage={onNewMessage}
        updateCampaignDonations={updateCampaignDonations}
        onNewError={onNewError} />
    </Elements>
  </StripeProvider>
);

export default Donate;
