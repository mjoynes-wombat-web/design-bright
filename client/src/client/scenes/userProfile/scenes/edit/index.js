import { connect } from 'react-redux';

import { logout, newError, newMessage, getUserInfo, editUser, requireAuth } from '../../../../actions';
import editProfile from './components';

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
  onEditUser(editData, callback) {
    dispatch(
      editUser(editData, callback),
    );
  },
  onRequireAuth() {
    return dispatch(
      requireAuth(),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(editProfile);
