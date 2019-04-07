import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../../reducers/ClientReducer';
import { addClient } from "../../ApiRequests";

class ClientForm extends React.Component {

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
            <option value='не указано'>Не выбрано</option>
            <option value='женский'>Женский</option>
            <option value='мужской'>Мужской</option>
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
            <option value='не указано'>Не выбрано</option>
            <option value='женат/замужем'>Женат/замужем</option>
            <option value='не женат/не замужем'>Не женат/не замужем</option>
          </select>

          <label htmlFor='citizenship'>Гражданство</label>
          <input id='citizenship' type='text'/>

          <label htmlFor='monthlyIncome'>Ежемесячный доход</label>
          <input id='monthlyIncome' type='text'/>

          <input id='invalid' type='checkbox' value='true'/>
          <label htmlFor='invalid'>Имеет инвалидность</label>

          <input id='retiree' type='checkbox' value='true'/>
          <label htmlFor='retiree'>Пенсионер</label>

          <button type='submit' onClick={ClientForm.onAdd}>Добавить</button>
        </form>
      </div>
    );
  }

  static toggleForm() {
    const clientForm = document.getElementById('clientForm');
    clientForm.toggleAttribute('hidden');
  }

  static onAdd() {
    const firstName = getValue('firstName');
    const lastName = getValue('lastName');
    const patrName = getValue('patrName');
    const dateOfBirth = getValue('dateOfBirth');
    const gender = getValue('gender');
    const passportSeries = getValue('passportSeries');
    const passportNumber = getValue('passportNumber');
    const dateOfIssue = getValue('dateOfIssue');
    const issuedBy = getValue('issuedBy');
    const identificationalNumber = getValue('identificationalNumber');
    const placeOfBirth = getValue('placeOfBirth');
    const placeOfResidence = getValue('placeOfResidence');
    const residenceAddress = getValue('residenceAddress');
    const statPhoneNumber = getValue('statPhoneNumber');
    const mobPhoneNumber = getValue('mobPhoneNumber');
    const email = getValue('email');
    const placeOfRegistration = getValue('placeOfRegistration');
    const registrationAddress = getValue('registrationAddress');
    const maritalStatus = getValue('maritalStatus');
    const citizenship = getValue('citizenship');
    const monthlyIncome = getValue('monthlyIncome');
    const invalidElement = document.getElementById('invalid');
    const invalid = invalidElement.checked ? 'true' : 'false';
    const retireeElement = document.getElementById('retiree');
    const retiree = retireeElement.checked ? 'true' : 'false';

    const client = {
      firstName, lastName, patrName, dateOfBirth, gender, passportSeries, passportNumber,
      dateOfIssue, issuedBy, identificationalNumber, placeOfBirth, placeOfResidence, residenceAddress,
      statPhoneNumber, mobPhoneNumber, email, placeOfRegistration, registrationAddress, maritalStatus,
      citizenship, invalid, retiree, monthlyIncome
    };

    ClientForm.toggleForm();

    addClient(client)
      .then(newClient => this.props.addClient(newClient));
  }
}

const getValue = elementId => {
  return document.getElementById(`${elementId}`).value
};

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