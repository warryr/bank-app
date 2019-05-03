import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../reducers/ClientReducer';
import { addClient } from '../../apiRequests';
import { createObjectFromInput } from '../../util/domUtil';

class ClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.onAdd = this.onAdd.bind(this);
  }

  render() {
    return (
      <div>
        <button id='showForm' onClick={ClientForm.toggleForm}>Добавить клиента</button>
        <form id='clientForm' hidden>
          <label htmlFor='firstName'>Имя</label>
          <input id='firstName' type='text'/>

          <label htmlFor='lastName'>Фамилия</label>
          <input id='lastName' type='text'/>

          <label htmlFor='patrName'>Отчество</label>
          <input id='patrName' type='text'/>

          <label htmlFor='dateOfBirth'>Дата рождения</label>
          <input id='dateOfBirth' type='date'/>

          <label htmlFor='gender'>Пол</label>
          <select id='gender'>
            <option value='не выбрано'>не выбрано</option>
            <option value='женский'>женский</option>
            <option value='мужской'>мужской</option>
          </select>

          <label htmlFor='passportSeries'>Серия паспорта</label>
          <input id='passportSeries' type='text'/>

          <label htmlFor='passportNumber'>Номер паспорта</label>
          <input id='passportNumber' type='text'/>

          <label htmlFor='dateOfIssue'>Дата выдачи</label>
          <input id='dateOfIssue' type='date'/>

          <label htmlFor='issuedBy'>Кем выдан</label>
          <input id='issuedBy' type='text'/>

          <label htmlFor='identificationalNumber'>Идентификационный номер</label>
          <input id='identificationalNumber' type='text'/>

          <label htmlFor='placeOfBirth'>Место рождения</label>
          <input id='placeOfBirth' type='text'/>

          <label htmlFor='placeOfResidence'>Город проживания</label>
          <input id='placeOfResidence' type='text'/>

          <label htmlFor='residenceAddress'>Адрес проживания</label>
          <input id='residenceAddress' type='text'/>

          <label htmlFor='statPhoneNumber'>Домашний телефон</label>
          <input id='statPhoneNumber' type='tel'/>

          <label htmlFor='mobPhoneNumber'>Мобильный телефон</label>
          <input id='mobPhoneNumber' type='tel'/>

          <label htmlFor='email'>Email</label>
          <input id='email' type='email'/>

          <label htmlFor='placeOfRegistration'>Город прописки</label>
          <input id='placeOfRegistration' type='text'/>

          <label htmlFor='registrationAddress'>Адрес прописки</label>
          <input id='registrationAddress' type='text'/>

          <label htmlFor='maritalStatus'>Семейное положение</label>
          <select id='maritalStatus'>
            <option value='не выбрано'>не выбрано</option>
            <option value='женат/замужем'>женат/замужем</option>
            <option value='не женат/не замужем'>не женат/не замужем</option>
          </select>

          <label htmlFor='citizenship'>Гражданство</label>
          <input id='citizenship' type='text'/>

          <label htmlFor='monthlyIncome'>Ежемесячный доход</label>
          <input id='monthlyIncome' type='text'/>

          <input id='invalid' type='checkbox' value='true'/>
          <label htmlFor='invalid'>Имеет инвалидность</label>

          <input id='retiree' type='checkbox' value='true'/>
          <label htmlFor='retiree'>Пенсионер</label>

          <button type='submit' onClick={this.onAdd}>Добавить</button>
        </form>
      </div>
    );
  }

  static toggleForm() {
    const clientForm = document.getElementById('clientForm');
    clientForm.toggleAttribute('hidden');
  }

  onAdd() {
    ClientForm.toggleForm();

    const map = {
      'firstName': 'firstName',
      'lastName': 'lastName',
      'patrName': 'patrName',
      'dateOfBirth': 'dateOfBirth',
      'gender': 'gender',
      'passportSeries': 'passportSeries',
      'passportNumber': 'passportNumber',
      'dateOfIssue': 'dateOfIssue',
      'issuedBy': 'issuedBy',
      'identificationalNumber': 'identificationalNumber',
      'placeOfBirth': 'placeOfBirth',
      'placeOfResidence': 'placeOfResidence',
      'residenceAddress': 'residenceAddress',
      'statPhoneNumber': 'statPhoneNumber',
      'mobPhoneNumber': 'mobPhoneNumber',
      'email': 'email',
      'placeOfRegistration': 'placeOfRegistration',
      'registrationAddress': 'registrationAddress',
      'maritalStatus': 'maritalStatus',
      'citizenship': 'citizenship',
      'monthlyIncome': 'monthlyIncome'
    };

    const client = createObjectFromInput(map);

    const invalidElement = document.getElementById('invalid');
    const invalid = !!invalidElement.checked;
    const retireeElement = document.getElementById('retiree');
    const retiree = !!retireeElement.checked;

    client.invalid = invalid;
    client.retiree = retiree;


    addClient(client)
      .then(newClient => this.props.addClient(newClient));
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  addClient: client => {
    dispatch({
      type: actions.ADD_CLIENT,
      client: client
    })
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientForm);