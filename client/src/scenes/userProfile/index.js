import { connect } from 'react-redux';

import Profile from './components';

const mapStateToProps = state => ({
  userAuth: state.userAuth,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
