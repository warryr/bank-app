import $ from 'jquery';
import React from 'react';
import {setFieldsFromInput, setFieldsFromSelect, setCheckedIfTrue} from '../../util/domUtil';
import {updateClient} from '../../apiRequests/clientApiRequests';
import {clientActions} from '../../reducers/clientReducer';
import connect from 'react-redux/es/connect/connect';
import 'flatpickr/dist/themes/light.css';
import { listOfInputs, listOfSelects } from './clientFieldsLists';
import {
  TableCitySelect,
  TableMaritalStatusSelect,
  TableCountrySelect,
  TableInvalidSelect,
} from './ClientStatelessComponents';
import { CheckboxTableInput, NumberTableInput, TextTableInput } from './../common/StatelessComponents';
import LoggedOutRedirector from './../common/LoggedOutRedirector';
import validate from './clientValidator';

class SingleClientUpdateInfo extends React.Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  render() {
    const client = this.props.currentClient;
    const errors = this.props.errors;
    return (
    <div className='view-info'>
      <table>
        <tbody>
        <TextTableInput id='firstNameUpdated' label='Имя: *' defaultVal={client.firstName} error={errors.firstName}/>
        <TextTableInput id='lastNameUpdated' label='Фамилия: *' defaultVal={client.lastName} error={errors.lastName}/>
        <TextTableInput id='patrNameUpdated' label='Отчество: *' defaultVal={client.patrName} error={errors.patrName}/>
        <TextTableInput id='dateOfBirthUpdated' label='Дата рождения: *' defaultVal={client.dateOfBirth}
                        error={errors.dateOfBirth}/>
        <tr>
          <td>Пол: *</td>
          <td>
            <label htmlFor='genderChoice1Updated'>мужской</label>
            <input id='genderChoice1Updated' name='genderUpdated' type='radio' value='false'/>
            <label htmlFor='genderChoice2Updated'>женский</label>
            <input id='genderChoice2Updated' name='genderUpdated' type='radio' value='true'/>
          </td>
        </tr>
        <TextTableInput id='passportSeriesUpdated' label='Серия паспорта: *' defaultVal={client.passportSeries}
                        error={errors.passportSeries}/>
        <TextTableInput id='passportNumberUpdated' label='Номер паспорта: *' defaultVal={client.passportNumber}
                        error={errors.passportNumber}/>
        <TextTableInput id='dateOfIssueUpdated' label='Дата выдачи: *' defaultVal={client.dateOfIssue}
                        error={errors.dateOfIssue}/>
        <TextTableInput id='issuedByUpdated' label='Кем выдан: *' defaultVal={client.issuedBy} error={errors.issuedBy}/>
        <TextTableInput id='identNumberUpdated' label='Идентификационный номер: *'
                        defaultVal={client.identNumber} error={errors.identNumber}/>
        <TextTableInput id='placeOfBirthUpdated' label='Место рождения: *' defaultVal={client.placeOfBirth}
                        error={errors.placeOfBirth}/>
        <TableCitySelect id='cityOfResidenceUpdated' label='Город проживания: *' error={errors.cityOfResidence}/>
        <TextTableInput id='residenceAddressUpdated' label='Адрес проживания: *' defaultVal={client.residenceAddress}
                        error={errors.residenceAddress}/>
        <TextTableInput id='statPhoneNumberUpdated' label='Домашний телефон: ' defaultVal={client.statPhoneNumber}
                        error={errors.statPhoneNumber}/>
        <TextTableInput id='mobPhoneNumberUpdated' label='Мобильный телефон: ' defaultVal={client.mobPhoneNumber}
                        error={errors.mobPhoneNumber}/>
        <TextTableInput id='emailUpdated' label='Email: ' defaultVal={client.email}
                        error={errors.email}/>
        <TableCitySelect id='cityOfRegistrationUpdated' label='Город проживания: *' error={errors.cityOfRegistration}/>
        <TextTableInput id='registrationAddressUpdated' label='Адрес прописки: *' defaultVal={client.registrationAddress}
                        error={errors.registrationAddress}/>
        <TableMaritalStatusSelect id='maritalStatusUpdated' label='Семейное положение: *' error={errors.maritalStatus}/>
        <TableCountrySelect id='citizenshipUpdated' label='Гражданство: *' error={errors.citizenship}/>
        <NumberTableInput id='monthlyIncomeUpdated' label='Ежемесячный доход (BYN): ' min='0'
                          defaultVal={client.monthlyIncome} error={errors.monthlyIncome}/>
        <TableInvalidSelect id='invalidUpdated' label='Инвалидность: *' error={errors.invalid}/>
        <CheckboxTableInput id='retireeUpdated' label='Пенсионер: *'/>
        </tbody>
      </table>
      <button className='btn btn-light btn-form' onClick={this.onCancel}>Отменить</button>
      <button className='btn btn-light btn-form' onClick={this.onSave}>Сохранить</button>
    </div>
    );
  }

  componentDidMount() {
    document.getElementById('dateOfBirthUpdated').flatpickr();
    document.getElementById('dateOfIssueUpdated').flatpickr();

    $(`input[name='genderUpdated'][value=${this.props.currentClient.gender}]`).prop('checked', true);
    $(`#maritalStatusUpdated`).val(`${this.props.currentClient.maritalStatus}`);
    $(`#cityOfResidenceUpdated`).val(`${this.props.currentClient.cityOfResidence}`);
    $(`#cityOfRegistrationUpdated`).val(`${this.props.currentClient.cityOfRegistration}`);
    $(`#citizenshipUpdated`).val(`${this.props.currentClient.citizenship}`);
    $(`#invalidUpdated`).val(`${this.props.currentClient.invalid}`);

    const retireeUpdated = document.getElementById('retireeUpdated');
    setCheckedIfTrue(retireeUpdated, this.props.currentClient.retiree);
  }

  onCancel() {
    this.props.onJobFinish();
  }

  onSave() {
    const client = {};
    setFieldsFromInput(client, listOfInputs,'Updated');
    setFieldsFromSelect(client, listOfSelects,'Updated');

    client.gender = !!$(`input[name='genderUpdated']:checked`).val();
    client.retiree = !!(document.getElementById('retireeUpdated').checked);

    let valid = validate(client, this.props.setValidation);

    if (valid) {
      updateClient(client, this.props.currentClient.id,
        (updatedClient) => {
          this.props.updateCurrentClient(updatedClient);
          this.props.onJobFinish();
        },
        error => console.log(error));
    }
  };
}

const mapStateToProps = state => ({
  currentClient: state.client.currentClient || {},
  errors: state.client.validation.errors || {},
});

const mapDispatchToProps = dispatch => ({
  updateCurrentClient: client =>
    dispatch({
    type: clientActions.UPDATE_CURRENT_CLIENT,
    client
  }),
  setValidation: validation =>
    dispatch({
      type: clientActions.SET_CLIENT_VALIDATION,
      validation
    })
});

export default LoggedOutRedirector(connect(mapStateToProps, mapDispatchToProps)(SingleClientUpdateInfo));
