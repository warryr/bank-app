import React from 'react';
import { connect } from 'react-redux';
import { NumberInput, Select, TextInput} from '../common/StatelessComponents';
import { currency } from './../common/consts';
import LoggedOutRedirector from './../common/LoggedOutRedirector';

const depositTypes = ['Депозитный вклад до востребования', 'Депозитный срочный вклад с выплатой процентов'];

class DepositForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form>
          <Select id='depositType' label='Вид депозита *' options={depositTypes}/>
          <Select id='depositCurrency' label='Валюта депозита' options={currency}/>
          <NumberInput id='depositTerm' label='Срок депозита' min='1'/>
          <NumberInput id='depositAmount' label='Сумма депозита' min='100'/>
          <NumberInput id='depositPercent' label='Процент по депозиту' min='1'/>
          <button>Оформить</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

export default LoggedOutRedirector(connect(mapStateToProps, mapDispatchToProps)(DepositForm));