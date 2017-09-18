import { connect } from 'react-redux';

import { requireAuth } from '../../actions';
import Campaign from './components';

const mapStateToProps = state => ({
  userAuth: state.userAuth,
  userInfo: state.userInfo,
});

const mapDispatchToProps = dispatch => ({
  onRequireAuth() {
    return dispatch(
      requireAuth(),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Campaign);
