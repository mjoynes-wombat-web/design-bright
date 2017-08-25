import { connect } from 'react-redux';

import { logout, requireAuth } from '../../actions';
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
  onSearch(search) {
    console.log(`A search attempt was made for ${search}`);
  },
  onRequireAuth() {
    return dispatch(
      requireAuth(),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
