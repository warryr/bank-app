import React from 'react'
import $ from 'jquery'
import connect from 'react-redux/es/connect/connect'
import { entriesActions } from './reducers/entriesReducer'
import { makeReport } from 'src/services/api/entry'
import { yyyymmdd } from 'src/utils/convertationUtil'
import LoggedOutRedirector from 'src/common/LoggedOutRedirector'

Date.prototype.yyyymmdd = yyyymmdd

const EntriesTableHead = () => (
  <thead>
    <tr>
      <th className="entries" rowSpan="2">
        Счет, наименование
      </th>
      <th className="entries" colSpan="2">
        Сальдо на начало периода
      </th>
      <th className="entries" colSpan="2">
        Обороты за период
      </th>
      <th className="entries" colSpan="2">
        Сальдо на конец периода
      </th>
    </tr>
    <tr>
      <th className="entries">Дебет</th>
      <th className="entries">Кредит</th>
      <th className="entries">Дебет</th>
      <th className="entries">Кредит</th>
      <th className="entries">Дебет</th>
      <th className="entries">Кредит</th>
    </tr>
  </thead>
)

const EntriesCashbox = ({ amounts }) => {
  const cashbox = amounts ? amounts['1010'] : {}
  return (
    <tr>
      <td className="entries">1010 Касса</td>
      <td className="entries"></td>
      <td className="entries"></td>
      <td className="entries">{cashbox.debit ? cashbox.debit : ''}</td>
      <td className="entries">{cashbox.credit ? cashbox.credit : ''}</td>
      <td className="entries"></td>
      <td className="entries"></td>
    </tr>
  )
}

const EntriesFund = ({ amounts }) => {
  const fund = amounts ? amounts['7327'] : {}
  return (
    <tr>
      <td className="entries">7327 Фонд развития банка</td>
      <td className="entries"></td>
      <td className="entries">{fund.saldoStart}</td>
      <td className="entries">{fund.fundExpense ? fund.fundExpense : ''}</td>
      <td className="entries">{fund.fundIncome ? fund.fundIncome : ''}</td>
      <td className="entries"></td>
      <td className="entries">{fund.saldoEnd}</td>
    </tr>
  )
}

const EntriesAccount = ({ key, account }) => {
  return (
    <tr key={key}>
      <td className="entries">{account} Текущий счет</td>
      <td className="entries"></td>
      <td className="entries"></td>
      <td className="entries">{account.debit}</td>
      <td className="entries">{account.credit}</td>
      <td className="entries"></td>
      <td className="entries"></td>
    </tr>
  )
}

class Entries extends React.Component {
  constructor(props) {
    super(props)
    this.onClose = this.onClose.bind(this)
  }

  render() {
    const accountsBYN = this.props.entries['BYN'] ? this.props.entries['BYN']['accounts'] : {}
    const accountsRUB = this.props.entries['RUB'] ? this.props.entries['RUB']['accounts'] : {}
    const accountsUSD = this.props.entries['USD'] ? this.props.entries['USD']['accounts'] : {}
    const accountsEUR = this.props.entries['EUR'] ? this.props.entries['EUR']['accounts'] : {}
    return (
      <div className="view-info">
        <button type="button" className="btn btn-light" onClick={this.onClose}>
          Закрыть день
        </button>
        <table className="entries" hidden>
          <EntriesTableHead />
          <tbody>
            <tr>
              <td className="entries" colSpan="7">
                BYN
              </td>
            </tr>
            <EntriesCashbox amounts={this.props.entries['BYN']} />
            <EntriesFund amounts={this.props.entries['BYN']} />
            {Object.keys(accountsBYN).map((account, index) => (
              <EntriesAccount key={index} account={account} />
            ))}
            <tr>
              <td className="entries" colSpan="7">
                RUB
              </td>
            </tr>
            <EntriesCashbox amounts={this.props.entries['RUB']} />
            <EntriesFund amounts={this.props.entries['RUB']} />
            {Object.keys(accountsRUB).map((account, index) => (
              <EntriesAccount key={index} account={account} />
            ))}
            <tr>
              <td className="entries" colSpan="7">
                USD
              </td>
            </tr>
            <EntriesCashbox amounts={this.props.entries['USD']} />
            <EntriesFund amounts={this.props.entries['USD']} />
            {Object.keys(accountsUSD).map((account, index) => (
              <EntriesAccount key={index} account={account} />
            ))}
            <tr>
              <td className="entries" colSpan="7">
                EUR
              </td>
            </tr>
            <EntriesCashbox amounts={this.props.entries['EUR']} />
            <EntriesFund amounts={this.props.entries['EUR']} />
            {Object.keys(accountsEUR).map((account, index) => (
              <EntriesAccount key={index} account={account} />
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  onClose() {
    $('table').removeAttr('hidden')
    makeReport((entries) => this.props.setEntries(entries), (error) => console.log(error))
  }
}

const mapStateToProps = (state) => ({
  entries: state.entries.entries || {},
})

const mapDispatchToProps = (dispatch) => ({
  setEntries: (entries) =>
    dispatch({
      type: entriesActions.SET_ENTRIES,
      entries,
    }),
})

export default LoggedOutRedirector(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Entries),
)
