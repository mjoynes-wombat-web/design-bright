/* eslint-env browser */
import React from 'react';

import OverlayModal from '../../../partials/overlayModal';
import LoginForm from '../';

const LoginModal = ({ actionName, closeAction }) => (
  <OverlayModal closeAction={closeAction}>
    <LoginForm actionName={actionName} />
    <div className="row align-center">
      <button
        className="cancel columns shrink"
        onClick={closeAction}
        type='button'>
        Cancel
      </button>
    </div>
  </OverlayModal>
);

export default LoginModal;
