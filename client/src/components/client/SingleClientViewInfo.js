import React from 'react';
import {Link} from "react-router-dom";

const TableItem = ({ label, fieldValue }) => (
  <tr>
    <td>{label}</td>
    <td>{fieldValue}</td>
  </tr>
);

export default class SingleClientViewInfo extends React.Component {
  render() {
    return (
    <div>
      <table>
        <tbody>
        <TableItem label='Имя: ' fieldValue={this.props.currentClient.firstName}/>
        <TableItem label='Фамилия: ' fieldValue={this.props.currentClient.lastName}/>
        <TableItem label='Отчество: ' fieldValue={this.props.currentClient.patrName}/>
        <TableItem label='Дата рождения: ' fieldValue={this.props.currentClient.dateOfBirth}/>
        <TableItem label='Пол: ' fieldValue={this.props.currentClient.gender}/>
        <TableItem label='Серия паспорта: ' fieldValue={this.props.currentClient.passportSeries}/>
        <TableItem label='Номер паспорта: ' fieldValue={this.props.currentClient.passportNumber}/>
        <TableItem label='Дата выдачи: ' fieldValue={this.props.currentClient.dateOfIssue}/>
        <TableItem label='Кем выдан: ' fieldValue={this.props.currentClient.issuedBy}/>
        <TableItem label='Идентификационный номер: ' fieldValue={this.props.currentClient.identNumber}/>
        <TableItem label='Место рождения: ' fieldValue={this.props.currentClient.placeOfBirth}/>
        <TableItem label='Город проживания: ' fieldValue={this.props.currentClient.cityOfResidence}/>
        <TableItem label='Адрес проживания: ' fieldValue={this.props.currentClient.residenceAddress}/>
        <TableItem label='Домашний телефон: ' fieldValue={this.props.currentClient.statPhoneNumber}/>
        <TableItem label='Мобильный телефон: ' fieldValue={this.props.currentClient.mobPhoneNumber}/>
        <TableItem label='Email: ' fieldValue={this.props.currentClient.email}/>
        <TableItem label='Город прописки: ' fieldValue={this.props.currentClient.cityOfRegistration}/>
        <TableItem label='Адрес прописки: ' fieldValue={this.props.currentClient.registrationAddress}/>
        <TableItem label='Семейное положение: ' fieldValue={this.props.currentClient.maritalStatus}/>
        <TableItem label='Гражданство: ' fieldValue={this.props.currentClient.citizenship}/>
        <TableItem label='Ежемесячный доход (BYN): ' fieldValue={this.props.currentClient.monthlyIncome}/>
        <TableItem label='Инвалидность: ' fieldValue={this.props.currentClient.invalid}/>
        <TableItem label='Пенсионер: ' fieldValue={this.props.currentClient.retiree ? 'да' : 'нет'}/>
        </tbody>
      </table>
      <button onClick={this.props.update}>Редактировать</button>
      <Link to={`/clients/${this.props.client.id}/createDeposit`}>Оформить депозит</Link>
      <Link to={`/clients/${this.props.client.id}/createCredit`}>Оформить кредит</Link>
    </div>
    );
  }
}
