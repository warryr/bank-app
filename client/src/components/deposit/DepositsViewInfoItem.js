import React from 'react';

export default class DepositsViewInfoItem extends React.Component {
  render() {
    return(
      <tr>
        <td>{this.props.index}</td>
        <td>{this.props.deposit.depositType}</td>
        <td>{this.props.deposit.depositTerm !== '' ? this.props.deposit.depositTerm : 'бессрочный'}</td>
        <td>{this.props.deposit.depositPercent}</td>
        <td>{this.props.deposit.depositCurrency}</td>
        <td>{this.props.deposit.depositAmount}</td>
      </tr>
    );
  }
}