import React, { Component } from 'react';
import './App.css';
import ClientForm from './components/client/ClientForm'
import ClientTable from './components/client/ClientTable';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <ClientTable/>
        <ClientForm/>
      </div>
    );
  }
}
