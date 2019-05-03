import React from 'react';
import { Link } from 'react-router-dom';
import { VFileMessage as match } from "vfile-message";

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
          <Link to={`/clients/${this.props.client.id}`}>Показать полностью</Link>
        </td>
      </tr>
    );
  }
}