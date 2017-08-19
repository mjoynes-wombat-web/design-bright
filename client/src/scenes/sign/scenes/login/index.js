import { connect } from 'react-redux';

import { login } from '../../../../actions';
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
