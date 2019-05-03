import React from 'react';
import { createObjectFromInput } from '../../util/domUtil';
import { updateClient } from '../../apiRequests';
import { actions } from '../../reducers/ClientReducer';
import connect from 'react-redux/es/connect/connect';
import { selectOptionByValue } from '../../util/domUtil';
import { checkIfTrue } from '../../util/domUtil';

class SingleClientUpdateInfo extends React.Component {
  constructor(props) {
    super(props);
    this.onSave = this.onSave.bind(this);
  }

  render() {
    return (
    <div>
      <table>
        <tbody>
        <tr>
          <td>Имя: </td>
          <td><input id='firstNameUpdated' type='text' defaultValue={this.props.currentClient.firstName}/></td>
        </tr>
        <tr>
          <td>Фамилия: </td>
          <td><input id='lastNameUpdated' type='text' defaultValue={this.props.currentClient.lastName}/></td>
        </tr>
        <tr>
          <td>Отчество: </td>
          <td><input id='patrNameUpdated' type='text' defaultValue={this.props.currentClient.patrName}/></td>
        </tr>
        <tr>
          <td>Дата рождения: </td>
          <td><input id='dateOfBirthUpdated' type='text' defaultValue={this.props.currentClient.dateOfBirth}/></td>
        </tr>
        <tr>
          <td>Пол: </td>
          <td><select id='genderUpdated'>
            <option value='не выбрано'>не выбрано</option>
            <option value='женский'>женский</option>
            <option value='мужской'>мужской</option>
          </select></td>
        </tr>
        <tr>
          <td>Серия паспорта: </td>
          <td><input id='passportSeriesUpdated' type='text' defaultValue={this.props.currentClient.passportSeries}/></td>
        </tr>
        <tr>
          <td>Номер паспорта: </td>
          <td><input id='passportNumberUpdated' type='text' defaultValue={this.props.currentClient.passportNumber}/></td>
        </tr>
        <tr>
          <td>Дата выдачи: </td>
          <td><input id='dateOfIssueUpdated' type='text' defaultValue={this.props.currentClient.dateOfIssue}/></td>
        </tr>
        <tr>
          <td>Кем выдан: </td>
          <td><input id='issuedByUpdated' type='text' defaultValue={this.props.currentClient.issuedBy}/></td>
        </tr>
        <tr>
          <td>Идентификационный номер: </td>
          <td><input id='identificationalNumberUpdated' type='text' defaultValue={this.props.currentClient.identificationalNumber}/></td>
        </tr>
        <tr>
          <td>Место рождения: </td>
          <td><input id='placeOfBirthUpdated' type='text' defaultValue={this.props.currentClient.placeOfBirth}/></td>
        </tr>
        <tr>
          <td>Город проживания: </td>
          <td><input id='placeOfResidenceUpdated' type='text' defaultValue={this.props.currentClient.placeOfResidence}/></td>
        </tr>
        <tr>
          <td>Адрес проживания: </td>
          <td><input id='residenceAddressUpdated' type='text' defaultValue={this.props.currentClient.residenceAddress}/></td>
        </tr>
        <tr>
          <td>Домашний телефон: </td>
          <td><input id='statPhoneNumberUpdated' type='text' defaultValue={this.props.currentClient.statPhoneNumber}/></td>
        </tr>
        <tr>
          <td>Мобильный телефон: </td>
          <td><input id='mobPhoneNumberUpdated' type='text' defaultValue={this.props.currentClient.mobPhoneNumber}/></td>
        </tr>
        <tr>
          <td>Email: </td>
          <td><input id='emailUpdated' type='email' defaultValue={this.props.currentClient.email}/></td>
        </tr>
        <tr>
          <td>Город прописки: </td>
          <td><input id='placeOfRegistrationUpdated' type='text' defaultValue={this.props.currentClient.placeOfRegistration}/></td>
        </tr>
        <tr>
          <td>Адрес прописки: </td>
          <td><input id='registrationAddressUpdated' type='text' defaultValue={this.props.currentClient.registrationAddress}/></td>
        </tr>
        <tr>
          <td>Семейное положение: </td>
          <td><select id='maritalStatusUpdated'>
            <option value='не выбрано'>не выбрано</option>
            <option value='женский'>женский</option>
            <option value='мужской'>мужской</option>
          </select></td>
        </tr>
        <tr>
          <td>Гражданство: </td>
          <td><input id='citizenshipUpdated' type='text' defaultValue={this.props.currentClient.citizenship}/></td>
        </tr>
        <tr>
          <td>Ежемесячный доход: </td>
          <td><input id='monthlyIncomeUpdated' type='text' defaultValue={this.props.currentClient.monthlyIncome}/></td>
        </tr>
        <tr>
          <td>Имеет инвалидность: </td>
          <td><input id='invalidUpdated' type='checkbox'/></td>
        </tr>
        <tr>
          <td>Пенсионер: </td>
          <td><input id='retireeUpdated' type='checkbox'/></td>
        </tr>
        </tbody>
      </table>
      <button onClick={this.onSave}>Сохранить</button>
    </div>
    );
  }

  componentDidMount() {
    const genderUpdated = document.getElementById('genderUpdated');
    genderUpdated.selectedIndex = selectOptionByValue(genderUpdated, this.props.currentClient.gender);
    const maritalStatusUpdated = document.getElementById('maritalStatusUpdated');
    maritalStatusUpdated.selectedIndex = selectOptionByValue(maritalStatusUpdated, this.props.currentClient.maritalStatus)
    const invalidUpdated = document.getElementById('invalidUpdated');
    checkIfTrue(invalidUpdated, this.props.currentClient.invalid);
    const retireeUpdated = document.getElementById('retireeUpdated');
    checkIfTrue(retireeUpdated, this.props.currentClient.retiree);
  }

  onSave() {
    const map = {
      'firstName': 'firstNameUpdated',
      'lastName': 'lastNameUpdated',
      'patrName': 'patrNameUpdated',
      'dateOfBirth': 'dateOfBirthUpdated',
      'gender': 'genderUpdated',
      'passportSeries': 'passportSeriesUpdated',
      'passportNumber': 'passportNumberUpdated',
      'dateOfIssue': 'dateOfIssueUpdated',
      'issuedBy': 'issuedByUpdated',
      'identificationalNumber': 'identificationalNumberUpdated',
      'placeOfBirth': 'placeOfBirthUpdated',
      'placeOfResidence': 'placeOfResidenceUpdated',
      'residenceAddress': 'residenceAddressUpdated',
      'statPhoneNumber': 'statPhoneNumberUpdated',
      'mobPhoneNumber': 'mobPhoneNumberUpdated',
      'email': 'emailUpdated',
      'placeOfRegistration': 'placeOfRegistrationUpdated',
      'registrationAddress': 'registrationAddressUpdated',
      'maritalStatus': 'maritalStatusUpdated',
      'citizenship': 'citizenshipUpdated',
      'monthlyIncome': 'monthlyIncomeUpdated'
    };

    const client = createObjectFromInput(map);

    const invalidElement = document.getElementById('invalidUpdated');
    const invalidUpdated = !!invalidElement.checked;
    const retireeElement = document.getElementById('retireeUpdated');
    const retireeUpdated = !!retireeElement.checked;

    client.invalid = invalidUpdated;
    client.retiree = retireeUpdated;

    updateClient(client, this.props.currentClient.id)
      .then(updatedClient => {
        this.props.updateCurrentClient(updatedClient);
        this.props.onJobFinish();
      });
  };
}

const mapStateToProps = state => ({
  currentClient: state.currentClient ? state.currentClient : {}
});

const mapDispatchToProps = dispatch => ({
  updateCurrentClient: client => dispatch({
    type: actions.UPDATE_CURRENT_CLIENT,
    client
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleClientUpdateInfo);
