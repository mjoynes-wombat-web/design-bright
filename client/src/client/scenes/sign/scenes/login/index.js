import { connect } from 'react-redux';

import { login, newMessage } from '../../../../actions';
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
