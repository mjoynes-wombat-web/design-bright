import { connect } from 'react-redux';

import { newError, clearError, newMessage, clearMessage } from '../../../../actions';
import Register from './components';

const mapStateToProps = state => ({
  userAuth: state.userAuth,
});

const mapDispatchToProps = dispatch => ({
  onNewError(errorMsg) {
    dispatch(
      newError(errorMsg),
    );
  },
  onClearError() {
    dispatch(
      clearError(),
    );
  },
  onNewMessage(msg) {
    dispatch(
      newMessage(msg),
    );
  },
  onClearMessage() {
    dispatch(
      clearMessage(),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
