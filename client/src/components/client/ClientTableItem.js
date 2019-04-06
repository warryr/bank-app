import React from 'react';

export default class ClientTableItem extends React.Component {
  render() {
    return(
      <tr>
        <td>{this.props.index}</td>
        <td>{this.props.client.firstName}</td>
        <td>{this.props.client.lastName}</td>
        <td>{this.props.client.patrName}</td>
        <td>
          <button onClick={() => this.props.delete(this.props.client.id)}>Удалить</button>
          <button onClick={() => this.props.update(this.props.client.id)}>Редактировать</button>
        </td>
      </tr>
    );
  }
}