import $ from 'jquery';
import React from 'react';
import {setFieldsFromInput, setFieldsFromSelect, setCheckedIfTrue} from '../../util/domUtil';
import {updateClient} from '../../apiRequests';
import {actions} from '../../reducers/ClientReducer';
import connect from 'react-redux/es/connect/connect';
import 'flatpickr/dist/themes/light.css';
import { listOfInputs, listOfSelects } from './clientFieldsLists';
import {
  TableTextInput,
  TableNumberInput,
  TableCitySelect,
  TableMaritalStatusSelect,
  TableCountrySelect,
  TableInvalidSelect, TableCheckboxInput
} from './ClientStatelessComponents';

class SingleClientUpdateInfo extends React.Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
  }

  render() {
    const client = this.props.currentClient;
    const errors = this.props.errors;
    return (
    <div>
      <table>
        <tbody>
        <TableTextInput id='firstNameUpdated' label='Имя: *' defaultVal={client.firstName} error={errors.firstName}/>
        <TableTextInput id='lastNameUpdated' label='Фамилия: *' defaultVal={client.lastName} error={errors.lastName}/>
        <TableTextInput id='patrNameUpdated' label='Отчество: *' defaultVal={client.patrName} error={errors.patrName}/>
        <TableTextInput id='dateOfBirthUpdated' label='Дата рождения: *' defaultVal={client.dateOfBirth}
                        error={errors.dateOfBirth}/>
        <tr>
          <td>Пол: *</td>
          <td>
            <label htmlFor='genderChoice1Updated'>мужской</label>
            <input id='genderChoice1Updated' name='genderUpdated' type='radio' value='мужской'/>
            <label htmlFor='genderChoice2Updated'>женский</label>
            <input id='genderChoice2Updated' name='genderUpdated' type='radio' value='женский'/>
          </td>
        </tr>
        <TableTextInput id='passportSeriesUpdated' label='Серия паспорта: *' defaultVal={client.passportSeries}
                        error={errors.passportSeries}/>
        <TableTextInput id='passportNumberUpdated' label='Номер паспорта: *' defaultVal={client.passportNumber}
                        error={errors.passportNumber}/>
        <TableTextInput id='dateOfIssueUpdated' label='Дата выдачи: *' defaultVal={client.dateOfIssue}
                        error={errors.dateOfIssue}/>
        <TableTextInput id='issuedByUpdated' label='Кем выдан: *' defaultVal={client.issuedBy} error={errors.issuedBy}/>
        <TableTextInput id='identNumberUpdated' label='Идентификационный номер: *'
                        defaultVal={client.identNumber} error={errors.identNumber}/>
        <TableTextInput id='placeOfBirthUpdated' label='Место рождения: *' defaultVal={client.placeOfBirth}
                        error={errors.placeOfBirth}/>
        <TableCitySelect id='cityOfResidenceUpdated' label='Город проживания: *' error={errors.cityOfResidence}/>
        <TableTextInput id='residenceAddressUpdated' label='Адрес проживания: *' defaultVal={client.residenceAddress}
                        error={errors.residenceAddress}/>
        <TableTextInput id='statPhoneNumberUpdated' label='Домашний телефон: ' defaultVal={client.statPhoneNumber}
                        error={errors.statPhoneNumber}/>
        <TableTextInput id='mobPhoneNumberUpdated' label='Мобильный телефон: ' defaultVal={client.mobPhoneNumber}
                        error={errors.mobPhoneNumber}/>
        <TableTextInput id='emailUpdated' label='Email: ' defaultVal={client.email}
                        error={errors.email}/>
        <TableCitySelect id='cityOfRegistrationUpdated' label='Город проживания: *' error={errors.cityOfRegistration}/>
        <TableTextInput id='registrationAddressUpdated' label='Адрес прописки: *' defaultVal={client.registrationAddress}
                        error={errors.registrationAddress}/>
        <TableMaritalStatusSelect id='maritalStatusUpdated' label='Семейное положение: *' error={errors.maritalStatus}/>
        <TableCountrySelect id='citizenshipUpdated' label='Гражданство: *' error={errors.citizenship}/>
        <TableNumberInput id='monthlyIncomeUpdated' label='Ежемесячный доход (BYN): ' min='0'
                          defaultVal={client.monthlyIncome} error={errors.monthlyIncome}/>
        <TableInvalidSelect id='invalidUpdated' label='Инвалидность: *' error={errors.invalid}/>
        <TableCheckboxInput id='retireeUpdated' label='Пенсионер: *'/>
        </tbody>
      </table>
      <button onClick={this.onSave}>Сохранить</button>
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

  onSave() {
    const client = {};
    setFieldsFromInput(client, listOfInputs,'Updated');
    setFieldsFromSelect(client, listOfSelects,'Updated');

    client.gender = $(`input[name='genderUpdated']:checked`).val();
    client.retiree = !!(document.getElementById('retireeUpdated').checked);

    updateClient(client, this.props.currentClient.id)
      .then(updatedClient => {
        this.props.updateCurrentClient(updatedClient);
        this.props.onJobFinish();
      });
  };
}

const mapStateToProps = state => ({
  currentClient: state.currentClient || {},
  errors: state.validation.errors || {},
});

const mapDispatchToProps = dispatch => ({
  updateCurrentClient: client => dispatch({
    type: actions.UPDATE_CURRENT_CLIENT,
    client
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleClientUpdateInfo);
