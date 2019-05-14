import React from 'react';
import { connect } from 'react-redux';
import { NumberInput, Select, TextInput} from '../common/StatelessComponents';
import LoggedOutRedirector from './../common/LoggedOutRedirector';
import $ from 'jquery';
import { depositActions } from '../../reducers/depositReducer';
import validate from './depositValidator';
import { addDeposit } from '../../apiRequests/depositApiRequests';
import { yyyymmdd, sumDigits } from '../../util/convertationUtil';

Date.prototype.yyyymmdd = yyyymmdd;

const depositTypes = ['Депозитный вклад до востребования', 'Депозитный срочный вклад с выплатой процентов'];
const depositCurrencies = ['BYN', 'RUB', 'USD', 'EUR'];

const currencyDict = {
  'BYN': {
    '': '3%',
    '3': '9.67%',
    '9': '10.59%',
    '12': '12.75%',
    '18': '12.75%',
  },
  'RUB': {
    '': '2%',
    '12': '4%',
    '18': '6%',
  },
  'USD': {
    '': '0.01%',
    '30': '0.75%',
    '36': '0.77%',
  },
  'EUR': {
    '': '0.01%',
    '30': '0.50%',
    '36': '0.55%',
  },
};

class DepositForm extends React.Component {
  constructor(props) {
    super(props);
    this.onAdd = this.onAdd.bind(this);

    this.updateIfHasTerm = this.updateIfHasTerm.bind(this);
    this.updateIfCurrency = this.updateIfCurrency.bind(this);
    this.setPercentValue = this.setPercentValue.bind(this);
    this.toggleTermSelect = this.toggleTermSelect.bind(this);
    this.getTerms = this.getTerms.bind(this);

    this.state = {
      depositHasTerm: false,
      selectedCurrency: depositCurrencies[0],
      depositTerms: this.getTerms(depositCurrencies[0], false),
      selectedTerm: '',
      depositPercent: '',
    };
  }

  render() {
    return (
      <div className='view-info'>
        <form>
          <Select id='depositType' label='Вид депозита *' options={depositTypes}
                  onChange={this.updateIfHasTerm}/>
          <Select id='depositCurrency' label='Валюта депозита' options={depositCurrencies}
                  onChange={this.updateIfCurrency}/>
          <div className={this.state.depositHasTerm ? '' : 'hidden'}>
            <Select id='depositTerm' label='Срок депозита (месяцев)' options={this.state.depositTerms}
                    value={this.state.selectedTerm}
                    onChange={e => this.setState({selectedTerm: e.target.value})}/>
          </div>
          <TextInput id='depositPercent' label='Процент по депозиту' value={this.state.depositPercent} readOnly/>
          <TextInput id='depositStartDate' label='Дата начала депозитной программы' error={this.props.errors.depositStartDate}/>
          <NumberInput id='depositAmount' label='Сумма депозита' error={this.props.errors.depositAmount}/>
          <button type='button' className='btn btn-light' onClick={this.onAdd}>Оформить</button>
        </form>
      </div>
    );
  }

  toggleTermSelect() {
    const termSelect = $('#depositTerm');
    this.state.depositHasTerm ? termSelect.removeAttr('disabled') : termSelect.attr('disabled', '');

    this.setPercentValue();
  }

  componentDidMount = () => {
    document.getElementById('depositStartDate').flatpickr();
    this.toggleTermSelect();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.selectedTerm !== this.state.selectedTerm ||
        prevState.selectedCurrency !== this.state.selectedCurrency ||
        prevState.depositHasTerm !== this.state.depositHasTerm) {
      this.toggleTermSelect();
      this.setPercentValue();
    }
  };

  updateIfHasTerm() {
    const selectedType = $('#depositType').children('option:selected').val();
    const depositHasTerm = selectedType === depositTypes[1];

    const terms = this.getTerms(this.state.selectedCurrency, depositHasTerm);
    this.setState({
      depositTerms: terms,
      depositHasTerm,
      selectedTerm: terms[0],
      depositPercent: currencyDict[this.state.selectedCurrency][terms[0]],
    });
  }

  getTerms(selectedCurrency, hasTerms) {
    if(!hasTerms) {
      return [''];
    }
    let depositTerms = [];
    for (let term in currencyDict[selectedCurrency]) {
      if (currencyDict[selectedCurrency].hasOwnProperty(term) && term !== '') {
        depositTerms.push(term);
      }
    }
    return depositTerms;
  }

  updateIfCurrency() {
    const selectedCurrency = $('#depositCurrency').children('option:selected').val();

    let depositTerms = this.getTerms(selectedCurrency, this.state.depositHasTerm);

    this.setState({
      selectedCurrency,
      depositTerms,
      selectedTerm: depositTerms[0],
      depositPercent: currencyDict[selectedCurrency][depositTerms[0]],
    });
  }

  setPercentValue() {
    let depositPercent;
    if(this.state.depositHasTerm){
      depositPercent = currencyDict[this.state.selectedCurrency][this.state.selectedTerm] ?
        currencyDict[this.state.selectedCurrency][this.state.selectedTerm] :
        currencyDict[this.state.selectedCurrency]['']
    }
    else{
      depositPercent = currencyDict[this.state.selectedCurrency]['']
    }

    this.setState({depositPercent});
  }

  onAdd() {
    const depositAmount = $('#depositAmount').val();

    const deposit = {
      clientId: this.props.match.params.id,
      depositType: this.state.depositHasTerm ? depositTypes[1] : depositTypes[0],
      depositCurrency: this.state.selectedCurrency,
      depositTerm: this.state.selectedTerm,
      depositPercent: this.state.depositPercent,
      depositAmount,
      depositStatus: true,
    };

    const dateParts = $('#depositStartDate').val().split('-');
    let startDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2], 3, 0, 0, 0);
    deposit.depositStartDate = startDate.yyyymmdd();

    let endDate;
    if (this.state.selectedTerm !== '') {
      endDate = new Date(startDate.setMonth(startDate.getMonth() + parseInt(this.state.selectedTerm)));
      endDate = endDate.yyyymmdd();
    } else {
      endDate = '';
    }
    deposit.depositEndDate = endDate;

    let clientCode = parseInt(deposit.clientId, 16) % 10000;
    let generated = (Math.random() + '').replace('0.', '').slice(0,3);
    let account = '30141' + generated + clientCode;
    account += sumDigits(account);
    let percentAccount = '30142' + generated + clientCode;
    percentAccount += sumDigits(percentAccount);

    deposit.depositAccount = account;
    deposit.depositPercentAccount = percentAccount;

    let valid = validate(deposit, this.props.setValidation);

    if (valid) {
      $('form').find('#depositAmount, #depositStartDate').val('');

      deposit.depositAmount = parseInt(deposit.depositAmount);

      addDeposit(deposit,
          deposit => {
            this.props.addDeposit(deposit);
            this.props.history.push(`/clients/${this.props.match.params.id}`)
          },
          error => console.log(error));
    }
  }
}

const mapStateToProps = state => ({
  errors: state.deposit.validation.errors || {},
});

const mapDispatchToProps = dispatch => ({
  addDeposit: deposit => dispatch({
    type: depositActions.ADD_DEPOSIT,
    deposit
  }),
  setValidation: validation => dispatch({
    type: depositActions.SET_DEPOSIT_VALIDATION,
    validation
  })
});

export default LoggedOutRedirector(connect(mapStateToProps, mapDispatchToProps)(DepositForm));