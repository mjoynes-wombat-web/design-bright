import { connect } from 'react-redux';

import { logout } from '../../actions';
import Header from './components';

const mapStateToProps = state => ({
  userAuth: state.userAuth,
});

const mapDispatchToProps = dispatch => ({
  onLogout() {
    dispatch(
      logout(),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
