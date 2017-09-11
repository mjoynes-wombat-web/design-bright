import './scss/style.scss';

const OverlayModal = ({ closeAction, children }) => (
  <div className="overlay" id="overlayModal">
    <div className="background">
      <div className="close">
        <span onClick={closeAction}></span>
      </div>
      {children}
    </div>
  </div>
);

export default OverlayModal;
