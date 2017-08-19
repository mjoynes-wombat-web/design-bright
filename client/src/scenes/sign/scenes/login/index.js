import { connect } from 'react-redux';

import { login, logout } from '../../../../actions';
import Login from './components';

const mapStateToProps = state => ({
  userAuth: state.userAuth,
});

const mapDispatchToProps = dispatch => ({
  onLogin(loginInfo, callback) {
    dispatch(
      login(loginInfo,
        err => callback(err),
      ),
    );
  },
  onLogout() {
    dispatch(
      logout(),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
