import React from 'react'
import { connect } from 'react-redux';
import Redirector from './Redirector';

const LoggedOutRedirector = WrappedComponent => {
  class LoggedOutRedirectorComponent extends React.Component {
    render() {
      let Component = Redirector(WrappedComponent, () => this.props.token === '', '/login');
      return <Component {...this.props}/>
    }
  }

  const mapStateToProps = state => ({
    token: state.user.currentToken,
  });

  return connect(mapStateToProps)(LoggedOutRedirectorComponent);
};

export default LoggedOutRedirector;