import { connect } from 'react-redux';

import { getUserInfo, editUser, requireAuth } from '../../../../actions';
import editProfile from './components';

const mapStateToProps = state => ({
  userAuth: state.userAuth,
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
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
