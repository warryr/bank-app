import React from 'react'
import { withRouter } from 'react-router-dom'

const Redirector = (WrappedComponent, condition, redirectUrl) => {
  class RedirectorComponent extends React.Component {
    constructor(props) {
      super(props);
      this.redirectIfRequired = this.redirectIfRequired.bind(this);
    }

    render() {
      return this.redirect ? null : <WrappedComponent {...this.props}/>
    }

    componentWillMount = () => this.redirectIfRequired();
    componentDidUpdate = () => this.redirectIfRequired();

    redirectIfRequired(){
      this.redirect = condition();
      if (this.redirect) {
        this.props.history.push(redirectUrl);
      }
    }
  }

  return withRouter(RedirectorComponent);
};

export default Redirector;