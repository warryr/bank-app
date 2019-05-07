import React from 'react';
import { connect } from 'react-redux';
import { NumberInput, Select, TextInput} from '../common/StatelessComponents';
import { currency } from './../common/consts';
import LoggedOutRedirector from './../common/LoggedOutRedirector';

const creditTypes = [
  'Кредит с ежемесячным погашением долга аннуитетным платежом',
  'Кредит с ежемесянчым погашением процентов по кредиту дифференциованным платежом'
];

class CreditForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <form>
          <Select id='creditType' label='Вид кредита *' options={creditTypes}/>
          <Select id='creditCurrency' label='Валюта кредита' options={currency}/>
          <NumberInput id='creditTerm' label='Срок кредита' min='1'/>
          <NumberInput id='creditAmount' label='Сумма кредита' min='100'/>
          <NumberInput id='creditPercent' label='Процент по кредиту' min='1'/>
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

export default LoggedOutRedirector(connect(mapStateToProps, mapDispatchToProps)(CreditForm));