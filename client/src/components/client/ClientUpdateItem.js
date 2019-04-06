import React from 'react';

export default class ClientUpdateItem extends React.Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
  }

  render() {
    return(
      <tr>
        <td>{this.props.index}</td>
        <td><input id='firstNameUpdated' type='text' defaultValue={this.props.client.firstName}/></td>
        <td><input id='lastNameUpdated' type='text' defaultValue={this.props.client.lastName}/></td>
        <td><input id='patrNameUpdated' type='text' defaultValue={this.props.client.patrName}/></td>
        <td>
          <button onClick={this.onSave}>Сохранить изменения</button>
        </td>
      </tr>
    );
  }

  onSave() {
    const firstName = document.getElementById('firstNameUpdated').value;
    const lastName = document.getElementById('lastNameUpdated').value;
    const patrName = document.getElementById('patrNameUpdated').value;

    const client = {
      id: this.props.client.id,
      firstName,
      lastName,
      patrName
    };

    this.props.save(client);
  }
}