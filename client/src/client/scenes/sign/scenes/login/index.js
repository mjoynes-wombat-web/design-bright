import { connect } from 'react-redux';

import { login, requireAuth } from '../../../../actions';
import Login from './components';

const mapStateToProps = state => ({
  userAuth: state.userAuth,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  onLogin(loginInfo) {
    dispatch(
      login(loginInfo),
    );
  },
  onRequireAuth() {
    return dispatch(
      requireAuth(),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
