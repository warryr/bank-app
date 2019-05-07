import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import AllClients from './components/client/AllClients'
import SingleClient from './components/client/SingleClient';
import DepositForm from './components/deposit/DepositForm';
import CreditForm from './components/credit/CreditForm';
import LoginWrapper from './components/login/LoginWrapper';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path='/login' exact={true} component={LoginWrapper}/>
          <Route path='/clients' exact={true} component={AllClients}/>
          <Route path='/clients/:id([0-9a-fA-f]{24})' exact={true} component={SingleClient}/>
          <Route path='/clients/:id([0-9a-fA-f]{24})/createDeposit' exact={true} component={DepositForm}/>
          <Route path='/clients/:id([0-9a-fA-f]{24})/createCredit' exact={true} component={CreditForm}/>
        </Router>
      </div>
    );
  }
}
