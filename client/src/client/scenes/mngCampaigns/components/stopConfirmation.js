import './scss/stopConfModal.scss';

export const StopConfModal = ({ text, confirmAction, cancelAction, id }) => (
  <div className="overlay" id="stopConf">
    <div className="background">
      <div className="close">
        <span onClick={cancelAction}></span>
      </div>
      <section className="row align-middle align-center">
        <p className="columns small-10">{text}</p>
        <button
          className="secondary columns large-6 small-8"
          onClick={() => confirmAction(id)}>
          Stop Campaign
        </button>
        <button
          className="cancel columns small-12"
          onClick={cancelAction}
          type='button'>
          Cancel
        </button>
      </section>
    </div>
  </div>
);

export default StopConfModal;
