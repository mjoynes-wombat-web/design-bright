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
  onSearch(search) {
    console.log(`A search attempt was made for ${search}`);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
