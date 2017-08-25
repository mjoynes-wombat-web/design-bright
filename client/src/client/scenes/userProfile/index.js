import { connect } from 'react-redux';

import { logout, newError, newMessage, getUserInfo, requireAuth } from '../../actions';
import Profile from './components';

const mapStateToProps = state => ({
  userAuth: state.userAuth,
  userInfo: state.userInfo,
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
  onGetUserInfo(callback) {
    dispatch(
      getUserInfo(callback),
    );
  },
  onRequireAuth() {
    return dispatch(
      requireAuth(),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
