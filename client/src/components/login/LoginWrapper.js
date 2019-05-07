import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import redirector from '../common/Redirector';
import LoginForm from './LoginForm'

class LoginWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.component = redirector(LoginForm, () => this.props.token !== '', '/clients');
  }

  render() {
    return (
      <this.component {...this.props}/>
    )
  }
}

const mapStateToProps = state => ({
  token: state.user.currentToken,
});

export default withRouter(connect(mapStateToProps)(LoginWrapper));