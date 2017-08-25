import { connect } from 'react-redux';

import { login, newMessage, requireAuth } from '../../../../actions';
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
  onNewMessage(msg) {
    dispatch(
      newMessage('login', msg),
    );
  },
  onRequireAuth() {
    return dispatch(
      requireAuth(),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
