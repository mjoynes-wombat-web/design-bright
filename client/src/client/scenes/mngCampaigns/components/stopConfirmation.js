import './scss/stopConfModal.scss';
import OverlayModal from '../../../partials/overlayModal';

export const StopConfModal = ({ text, confirmAction, cancelAction, id }) => (
  <OverlayModal closeAction={cancelAction}>
    <section className="row align-middle align-center" id="stopConf">
      <p className="columns small-10">{text}</p>
      <button
        className="primary columns large-6 medium-8 small-10"
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
  </OverlayModal>
);

export default StopConfModal;
