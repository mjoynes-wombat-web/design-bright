import './scss/style.scss';

const cardIcon = (cardType) => {
  console.log(cardType);
  switch (cardType) {
    case 'Visa':
      return '';
    case 'MasterCard':
      return '';
    case 'American Express':
      return '';
    case 'Discover':
      return '';
    case 'Diners Club':
      return '';
    case 'JCB':
      return '';
    default:
      return '';
  }
};

const DonationConfirmation = ({ inputs, token, confirmDonation, editDonation, cancelConfirmation }) => (
  <div className="small-12 medium-10 large-8 columns" id="donationConfirmation" >
    <h2>
      <span className="underlined">
        Please Confirm Your Donation
      </span>
    </h2>
    <div className="row align-middle align-center donationInfo">
      <div className="actions">
        <button
          onClick={editDonation}
          className="edit"
          type="button">
          <span className="icon"></span>
          <span className="text">Change Donation</span>
        </button>
        <button
          onClick={cancelConfirmation}
          className="cancel"
          type="button">
          <span className="icon"></span>
          <span className="text">Cancel Donation</span>
        </button>
      </div>
      <div className="small-12 columns">
        <p className="title">
          Donation:
        </p>
        <p>{`$${(inputs.donation.slice(0, inputs.donation.length - 2))}.${inputs.donation.slice(-2)}`}</p>
        <p className="title">
          Payment Card:
        </p>
        <p>
          **** **** **** {token.card.last4}
          <span className="cardIcon">{cardIcon(token.card.brand)}</span>
        </p>
      </div>
      <button
        className="primary columns small-10"
        onClick={confirmDonation}
        type="button">
        Confirm Donation
      </button>
    </div>
    <div className="row align-center">
      <button
        className="cancel columns shrink"
        onClick={cancelConfirmation}
        type='button'>
        Cancel
      </button>
    </div>
  </div>
);

export default DonationConfirmation;
