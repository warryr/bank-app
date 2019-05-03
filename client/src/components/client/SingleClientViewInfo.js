import React from 'react';

export default class SingleClientViewInfo extends React.Component {
  render() {
    return (
    <div>
      <table>
        <tbody>
        <tr>
          <td>Имя: </td>
          <td>{this.props.currentClient.firstName}</td>
        </tr>
        <tr>
          <td>Фамилия: </td>
          <td>{this.props.currentClient.lastName}</td>
        </tr>
        <tr>
          <td>Отчество: </td>
          <td>{this.props.currentClient.patrName}</td>
        </tr>
        <tr>
          <td>Дата рождения: </td>
          <td>{this.props.currentClient.dateOfBirth}</td>
        </tr>
        <tr>
          <td>Пол: </td>
          <td>{this.props.currentClient.gender}</td>
        </tr>
        <tr>
          <td>Серия паспорта: </td>
          <td>{this.props.currentClient.passportSeries}</td>
        </tr>
        <tr>
          <td>Номер паспорта: </td>
          <td>{this.props.currentClient.passportNumber}</td>
        </tr>
        <tr>
          <td>Дата выдачи: </td>
          <td>{this.props.currentClient.dateOfIssue}</td>
        </tr>
        <tr>
          <td>Кем выдан: </td>
          <td>{this.props.currentClient.issuedBy}</td>
        </tr>
        <tr>
          <td>Идентификационный номер: </td>
          <td>{this.props.currentClient.identificationalNumber}</td>
        </tr>
        <tr>
          <td>Место рождения: </td>
          <td>{this.props.currentClient.placeOfBirth}</td>
        </tr>
        <tr>
          <td>Город проживания: </td>
          <td>{this.props.currentClient.placeOfResidence}</td>
        </tr>
        <tr>
          <td>Адрес проживания: </td>
          <td>{this.props.currentClient.residenceAddress}</td>
        </tr>
        <tr>
          <td>Домашний телефон: </td>
          <td>{this.props.currentClient.statPhoneNumber}</td>
        </tr>
        <tr>
          <td>Мобильный телефон: </td>
          <td>{this.props.currentClient.mobPhoneNumber}</td>
        </tr>
        <tr>
          <td>Email: </td>
          <td>{this.props.currentClient.email}</td>
        </tr>
        <tr>
          <td>Город прописки: </td>
          <td>{this.props.currentClient.placeOfRegistration}</td>
        </tr>
        <tr>
          <td>Адрес прописки: </td>
          <td>{this.props.currentClient.registrationAddress}</td>
        </tr>
        <tr>
          <td>Семейное положение: </td>
          <td>{this.props.currentClient.maritalStatus}</td>
        </tr>
        <tr>
          <td>Гражданство: </td>
          <td>{this.props.currentClient.citizenship}</td>
        </tr>
        <tr>
          <td>Ежемесячный доход: </td>
          <td>{this.props.currentClient.monthlyIncome}</td>
        </tr>
        <tr>
          <td>Имеет инвалидность: </td>
          <td>{this.props.currentClient.invalid ? 'да' : 'нет'}</td>
        </tr>
        <tr>
          <td>Пенсионер: </td>
          <td>{this.props.currentClient.retiree ? 'да' : 'нет'}</td>
        </tr>
        </tbody>
      </table>
      <button onClick={this.props.update}>Редактировать</button>
    </div>
    );
  }
}
