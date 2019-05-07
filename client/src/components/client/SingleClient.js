import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../reducers/clientReducer';
import { getSingleClient } from '../../apiRequests/clientApiRequests';
import SingleClientViewInfo from './SingleClientViewInfo';
import SingleClientUpdateInfo from './SingleClientUpdateInfo';
import LoggedOutRedirector from './../common/LoggedOutRedirector';

class SingleClient extends React.Component {
  constructor(props) {
    super(props);
    this.onUpdate = this.onUpdate.bind(this);
    this.onJobFinish = this.onJobFinish.bind(this);
    this.state = {update: false};
  }

  componentWillMount() {
    const href = window.location.href;
    const currentId = href.substr(href.lastIndexOf('/') + 1);

    getSingleClient(currentId, this.props.addCurrentClient);
  }

  render() {
    return (
      <div>
        <table>
          {this.state.update ?
            <SingleClientUpdateInfo currentClient={this.props.currentClient} onJobFinish={this.onJobFinish}/> :
            <SingleClientViewInfo currentClient={this.props.currentClient} update={this.onUpdate}/>}
        </table>
      </div>
    )
  }

  onUpdate() {
    this.setState({update: true});
  }

  onJobFinish() {
    this.setState({update: false});
  }
}

const mapStateToProps = state => ({
  currentClient: state.client.currentClient || {}
});

const mapDispatchToProps = dispatch => ({
  addCurrentClient: client => dispatch({
    type: actions.SET_CURRENT_CLIENT,
    client
  }),
});

export default LoggedOutRedirector(connect(mapStateToProps, mapDispatchToProps)(SingleClient));