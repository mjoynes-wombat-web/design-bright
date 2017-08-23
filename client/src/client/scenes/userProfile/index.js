import { connect } from 'react-redux';

import { logout, newError, newMessage } from '../../actions';
import Profile from './components';

const mapStateToProps = state => ({
  userAuth: state.userAuth,
});

const mapDispatchToProps = dispatch => ({
  onNewError(errorMsg) {
    dispatch(
      newError('profile', errorMsg),
    );
  },
  onLogout() {
    dispatch(
      logout(),
    );
  },
  onNewMessage(msg) {
    dispatch(
      newMessage('login', msg),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
