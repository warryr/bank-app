import $ from 'jquery';
import React from 'react';
import { connect } from 'react-redux';
import { clientActions } from '../../reducers/clientReducer';
import { addClient } from '../../apiRequests/clientApiRequests';
import { setFieldsFromInput, setFieldsFromSelect } from './../../util/domUtil';
import flatpickr from 'flatpickr';                                //не работает без этого импорта
import 'flatpickr/dist/themes/light.css';
import validate from './clientValidator';
import { listOfInputs, listOfSelects } from './clientFieldsLists';
import { MaritalStatusSelect, CountrySelect, CitySelect, InvalidSelect } from './ClientStatelessComponents';
import { CheckboxInput, NumberInput, TextInput } from './../common/StatelessComponents';
import LoggedOutRedirector from './../common/LoggedOutRedirector';

class ClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.onAdd = this.onAdd.bind(this);
  }

  render() {
    const errors = this.props.errors;
    return (
      <div>
        <button id='showForm' className='btn btn-light' onClick={ClientForm.toggleForm}>Добавить клиента</button>
        <form id='clientForm' hidden>
          <TextInput id='firstName' label='Имя *' error={errors.firstName}/>
          <TextInput id='lastName' label='Фамилия *' error={errors.lastName}/>
          <TextInput id='patrName' label='Отчество *' error={errors.patrName}/>
          <TextInput id='dateOfBirth' label='Дата рождения *' error={errors.dateOfBirth}/>

          <label htmlFor='gender'>Пол *</label>
          <label htmlFor='genderChoice1'>мужской</label>
          <input type='radio' id='genderChoice1' name='gender' value='false'/>
          <label htmlFor='genderChoice2'>женский</label>
          <input type='radio' id='genderChoice2' name='gender' value='true' checked/>

          <TextInput id='passportSeries' label='Серия паспорта *' error={errors.passportSeries}/>
          <TextInput id='passportNumber' label='Номер паспорта *' error={errors.passportNumber}/>
          <TextInput id='dateOfIssue' label='Дата выдачи *' error={errors.dateOfIssue}/>
          <TextInput id='issuedBy' label='Кем выдан *' error={errors.issuedBy}/>
          <TextInput id='identNumber' label='Идентификационный номер *' error={errors.identNumber}/>
          <TextInput id='placeOfBirth' label='Место рождения *' error={errors.placeOfBirth}/>
          <CitySelect id='cityOfResidence' label='Город проживания *' error={errors.cityOfResidence}/>
          <TextInput id='residenceAddress' label='Адрес проживания *' error={errors.residenceAddress}/>
          <TextInput id='statPhoneNumber' label='Домашний телефон' error={errors.statPhoneNumber}/>
          <TextInput id='mobPhoneNumber' label='Мобильный телефон' error={errors.mobPhoneNumber}/>
          <TextInput id='email' label='Email' error={errors.email}/>
          <CitySelect id='cityOfRegistration' label='Город прописки *' error={errors.cityOfRegistration}/>
          <TextInput id='registrationAddress' label='Адрес прописки *' error={errors.registrationAddress}/>
          <MaritalStatusSelect id='maritalStatus' label='Семейное положение *' error={errors.maritalStatus}/>
          <CountrySelect id='citizenship' label='Гражданство *' error={errors.citizenship}/>
          <NumberInput id='monthlyIncome' label='Ежемесячный доход (BYN)' min='1' error={errors.monthlyIncome}/>
          <InvalidSelect id='invalid' label='Инвалидность *' error={errors.invalid}/>
          <CheckboxInput id='retiree' label='Пенсионер '/>
          <button type='button' className='btn btn-light form-button' onClick={this.onAdd}>Добавить</button>
        </form>
      </div>
    );
  }

  componentDidMount() {
    document.getElementById('dateOfBirth').flatpickr();
    document.getElementById('dateOfIssue').flatpickr();
  }

  static toggleForm() {
    const clientForm = document.getElementById('clientForm');
    clientForm.toggleAttribute('hidden');
  }

  onAdd() {
    const client = {};
    setFieldsFromInput(client, listOfInputs);
    setFieldsFromSelect(client, listOfSelects);

    client.gender = !!$(`input[name='gender']:checked`).val();
    client.retiree = !!document.getElementById('retiree').checked;

    let valid = validate(client, this.props.setValidation);

    if (!valid) {
      window.scrollTo({
        top: 100,
        behavior: 'smooth'
      });
    }

    if (valid) {
      ClientForm.toggleForm();
      $('form').find('input, select').val('');

      client.monthlyIncome = parseInt(client.monthlyIncome);

      addClient(client, this.props.addClient, error => console.log(error));
    }

  }
}

const mapStateToProps = state => ({
  errors: state.client.validation.errors || {},
});

const mapDispatchToProps = dispatch => ({
  addClient: client =>
    dispatch({
      type: clientActions.ADD_CLIENT,
      client
    }),
  setValidation: validation =>
    dispatch({
      type: clientActions.SET_CLIENT_VALIDATION,
      validation
    })
});

export default LoggedOutRedirector(connect(mapStateToProps, mapDispatchToProps)(ClientForm));