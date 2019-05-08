import React from 'react';
import { Link } from 'react-router-dom';

export default class AllClientsViewInfoItem extends React.Component {
  render() {
    return(
      <tr>
        <td>{this.props.index}</td>
        <td>{this.props.client.firstName}</td>
        <td>{this.props.client.lastName}</td>
        <td>{this.props.client.patrName}</td>
        <td>
          <button className='btn btn-light' onClick={() => this.props.delete(this.props.client.id)}>Удалить</button>
          <Link to={`/clients/${this.props.client.id}`}>Показать полностью</Link>
        </td>
      </tr>
    );
  }
}