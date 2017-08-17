import { connect } from 'react-redux';

import { clearError } from '../../../../actions';
import Notifications from './components';

const mapStateToProps = state => ({
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  removeError(errorMessage) {
    dispatch(
      clearError(errorMessage),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
