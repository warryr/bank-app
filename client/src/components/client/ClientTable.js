import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../reducers/ClientReducer';
import ClientTableItem from './ClientTableItem';
import ClientUpdateItem from './ClientUpdateItem';
import { getAllClients, deleteClient } from './../../ApiRequests';

const ClientTableHead = () => (
  <tr>
    <th>ID</th>
    <th>Имя</th>
    <th>Фамилия</th>
    <th>Отчество</th>
    <th>Действия</th>
  </tr>
);

class ClientTable extends React.Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillMount() {
    getAllClients()
      .then(clients => this.props.setClients(clients));
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
            client.id === this.props.currentProcessingId ?
              <ClientUpdateItem key={index} client={client} index={index+1}
                                save={this.props.saveChanges}/> :
              <ClientTableItem key={index} client={client} index={index+1}
                               delete={() => this.onDelete(client.id)} update={this.props.updateClient}/>)}
          </tbody>
        </table>
      </div>
    );
  }

  onDelete(id) {
    deleteClient(id)
      .then(result => {
        if (result) {
          this.props.deleteClient(id);
        } else {
          console.log('You tried to delete someone who doesn\'t exist!!');
        }
      });
  }
}

const mapStateToProps = state => ({
  clients: state.clients,
  currentProcessingId: state.currentProcessingId,
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
  updateClient: id => dispatch({
    type: actions.UPDATE_CLIENT,
    id
  }),
  saveChanges: person => dispatch({
    type: actions.SAVE_CHANGES,
    client: person
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientTable);