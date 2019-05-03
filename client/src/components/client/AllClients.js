import React from 'react';
import ClientTable from './ClientTable';
import ClientForm from './ClientForm';

export default class AllClients extends React.Component {
  render() {
    return (
      <div>
        <ClientTable/>
        <ClientForm/>
      </div>
    )
  }
}