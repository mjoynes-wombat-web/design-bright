import { connect } from 'react-redux';

import { login } from '../../actions';
import LoginForm from './components';

const mapStateToProps = state => ({
  userAuth: state.userAuth,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  onLogin(loginInfo, callback) {
    dispatch(
      login(loginInfo, callback),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
