import { connect } from 'react-redux';

import { logout, requireAuth } from '../../actions';
import Header from './components';

const mapStateToProps = state => ({
  userAuth: state.userAuth,
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  onLogout() {
    dispatch(
      logout(),
    );
  },
  onRequireAuth() {
    return dispatch(
      requireAuth(),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
