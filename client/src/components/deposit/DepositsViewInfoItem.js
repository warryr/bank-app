import React from 'react';
import $ from 'jquery';

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
        <td>{this.props.deposit.depositStartDate}</td>
        <td>{this.props.deposit.depositEndDate}</td>
        <td>{this.props.deposit.depositStatus ? 'активный' : 'закрыт'}</td>
        {
          (this.props.deposit.depositStatus && this.props.deposit.depositTerm === '') ?
          <button id={'button' + this.props.index} type='button' className='btn btn-light'
                  onClick={() => this.props.end(this.props.deposit.id)}>Закрыть</button> :
          null
        }
      </tr>
    );
  }

  componentDidMount() {

  }
}