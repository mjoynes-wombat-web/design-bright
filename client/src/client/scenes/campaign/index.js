import { connect } from 'react-redux';

import { requireAuth, newError, newMessage } from '../../actions';
import Campaign from './components';

const mapStateToProps = state => ({
  userAuth: state.userAuth,
});

const mapDispatchToProps = dispatch => ({
  onRequireAuth() {
    return dispatch(
      requireAuth(),
    );
  },
  onNewMessage(msg) {
    return dispatch(
      newMessage('campaign', msg),
    );
  },
  onNewError(errMsg) {
    return dispatch(
      newError('campaign', errMsg),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Campaign);
