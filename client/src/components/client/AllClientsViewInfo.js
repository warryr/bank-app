import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../reducers/clientReducer';
import AllClientsViewInfoItem from './AllClientsViewInfoItem';
import { getAllClients, deleteClient } from '../../apiRequests/clientApiRequests';
import LoggedOutRedirector from './../common/LoggedOutRedirector';

const ClientTableHead = () => (
  <tr>
    <th>ID</th>
    <th>Имя</th>
    <th>Фамилия</th>
    <th>Отчество</th>
    <th>Действия</th>
  </tr>
);

class AllClientsViewInfo extends React.Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillMount() {
    getAllClients(this.props.setClients, error => console.log(error));
  }

  render() {
    return (
      <div>
        <table>
          <thead>
          <ClientTableHead/>
          </thead>
          <tbody>
          {this.props.clients.map((client, index) =>
              <AllClientsViewInfoItem key={index} client={client} index={index+1}
                                      delete={() => this.onDelete(client.id)}/>)}
          </tbody>
        </table>
      </div>
    );
  }

  onDelete(id) {
    deleteClient(id, id => this.props.deleteClient(id), error => console.log(error));
  }
}

const mapStateToProps = state => ({
  clients: state.client.clients,
});

const mapDispatchToProps = dispatch => ({
  setClients: clients => dispatch({
    type: actions.SET_CLIENTS,
    clients
  }),
  deleteClient: id => dispatch({
    type: actions.DELETE_CLIENT,
    id
  }),
});

export default LoggedOutRedirector(connect(mapStateToProps, mapDispatchToProps)(AllClientsViewInfo));