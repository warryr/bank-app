import React from 'react';
import { connect } from 'react-redux';
import DepositsViewInfoItem from './DepositsViewInfoItem';
import { depositActions } from '../../reducers/depositReducer';
import { getClientDeposits } from '../../apiRequests/depositApiRequests';

const DepositsTableHead = () => {
  return (
    <tr>
      <th>№</th>
      <th>Вид депозита</th>
      <th>Срок депозита</th>
      <th>Процент по депозиту</th>
      <th>Валюта депозита</th>
      <th>Сумма депозита</th>
    </tr>
  )
};

class DepositsViewInfo extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.currentClient.id !== prevProps.currentClient.id && this.props.currentClient.id !== 0) {
      getClientDeposits(this.props.currentClient.id, this.props.setClientDeposits, error => console.log(error));
    }
  }

  render() {
    return (
      <div>
        <h5>Депозиты</h5>
        <table className='deposits'>
          <thead>
          <DepositsTableHead/>
          </thead>
          <tbody>
          {this.props.deposits.map((deposit, index) =>
            <DepositsViewInfoItem key={index} deposit={deposit} index={index+1}/> )}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentClient: state.client.currentClient || {id: '0'},
  deposits: state.deposit.deposits,
});

const mapDispatchToProps = dispatch => ({
  setClientDeposits: deposits => dispatch({
    type: depositActions.SET_CLIENT_DEPOSITS,
    deposits,
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(DepositsViewInfo);