import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import AllClients from './components/client/AllClients'
import SingleClient from './components/client/SingleClient';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path='/clients' exact={true} component={AllClients}/>
          <Route path='/clients/:id([0-9a-fA-f]{24})' component={SingleClient}/>
        </Router>
      </div>
    );
  }
}
