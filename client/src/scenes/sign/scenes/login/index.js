import { connect } from 'react-redux';
import { login } from '../../../../actions';

import Login from './components';

const mapStateToProps = (state, props) => ({});

const mapDispatchToProps = dispatch => ({
  onLogin(loginInfo) {
    dispatch(
      login(loginInfo),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
