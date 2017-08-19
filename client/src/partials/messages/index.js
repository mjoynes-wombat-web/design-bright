import { connect } from 'react-redux';

import { clearMessage, clearError } from '../../actions';
import Message from './components';

const mapStateToProps = state => ({
  error: state.error,
  message: state.message,
});

const mapDispatchToProps = dispatch => ({
  onClearMessage() {
    dispatch(
      clearMessage(),
    );
  },
  onClearError() {
    dispatch(
      clearError(),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);
