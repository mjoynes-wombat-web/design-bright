import { connect } from 'react-redux';

import { newError, newMessage } from '../../../../actions';
import ContactForm from './components';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  onNewError(errorMsg) {
    dispatch(
      newError('register', errorMsg),
    );
  },
  onNewMessage(msg) {
    dispatch(
      newMessage('register', msg),
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
