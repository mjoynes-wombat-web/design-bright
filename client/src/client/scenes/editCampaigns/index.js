import { connect } from 'react-redux';

import { requireAuth, newMessage, newError } from '../../actions';
import editCampaigns from './components';

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
  onNewMessage(msg) {
    return dispatch(
      newMessage('editCampaign', msg),
    );
  },
  onNewError(errMsg) {
    return dispatch(
      newError('editCampaign', errMsg),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(editCampaigns);
