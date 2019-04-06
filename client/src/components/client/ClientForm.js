import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../reducers/ClientReducer';
import uuidv4 from 'uuid/v4';

class ClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.onAdd = this.onAdd.bind(this);
  }

  render() {
    return (
      <div>
        <input id='firstName' type='text'/>
        <input id='lastName' type='text'/>
        <button onClick={this.onAdd}>Добавить клиента</button>
      </div>
    );
  }

  onAdd() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    const client = {
      id: uuidv4(),
      firstName,
      lastName,
    };

    this.props.addPerson(client);
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addPerson: client => {
    dispatch({
      type: actions.ADD_CLIENT,
      client: client
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientForm);