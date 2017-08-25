import { connect } from 'react-redux';

import { newError, clearError, newMessage, clearMessage, requireAuth } from '../../../../actions';
import Register from './components';

const mapStateToProps = state => ({
  userAuth: state.userAuth,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  onNewError(errorMsg) {
    dispatch(
      newError('register', errorMsg),
    );
  },
  onClearError() {
    dispatch(
      clearError(),
    );
  },
  onNewMessage(msg) {
    dispatch(
      newMessage('register', msg),
    );
  },
  onClearMessage() {
    dispatch(
      clearMessage(),
    );
  },
  onRequireAuth() {
    return dispatch(
      requireAuth(),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
