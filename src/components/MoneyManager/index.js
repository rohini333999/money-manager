import {Component} from 'react'

import './index.css'

import {v4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    optionInput: transactionTypeOptions[0].optionId,
    transactionList: [],
  }

  handleTitle = event => {
    const {titleInput, amountInput, transactionList} = this.state
    this.setState({titleInput: event.target.value})
  }

  handleAmount = event => {
    const {titleInput, amountInput, transactionList} = this.state
    this.setState({amountInput: event.target.value})
  }

  handleOptions = event => {
    const {optionInput} = this.state
    this.setState({optionInput: event.target.value})
    console.log(`optionInput ${optionInput}`)
  }

  onsubmitForm = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionInput, transactionList} = this.state
    const typeOption = transactionTypeOptions.find(
      each => each.optionId === optionInput,
    )
    const {displayText} = typeOption

    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: amountInput,
      type: displayText,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
    }))
  }

  deleteClicked = deleteId => {
    const {titleInput, amountInput, optionInput, transactionList} = this.state

    this.setState(prevState => ({
      transactionList: prevState.transactionList.filter(
        each => each.id !== deleteId,
      ),
    }))
  }

  getExpenses = () => {
    const {transactionList} = this.state
    let expensesAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount =
          parseInt(expensesAmount) + parseInt(eachTransaction.amount)
      }
    })

    return expensesAmount
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount = parseInt(incomeAmount) + parseInt(eachTransaction.amount)
      }
    })

    return incomeAmount
  }

  getBalance = () => {
    const {transactionList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount = parseInt(incomeAmount) + parseInt(eachTransaction.amount)
      } else {
        expensesAmount =
          parseInt(expensesAmount) + parseInt(eachTransaction.amount)
      }
    })

    balanceAmount = parseInt(incomeAmount) - parseInt(expensesAmount)

    return balanceAmount
  }

  render() {
    const {titleInput, amountInput, optionInput, transactionList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()
    console.log(balanceAmount, incomeAmount, expensesAmount)

    return (
      <div className="money-manager">
        <div className="user-container">
          <h1 className="user-heading">Hi, Richard</h1>
          <p className="user-para">
            Welcome back to your
            <span className="span-para"> Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          incomeAmount={incomeAmount}
          expensesAmount={expensesAmount}
          balanceAmount={balanceAmount}
        />
        <div className="transaction-container">
          <div className="transaction-input">
            <h1 className="trans-para">Add Transaction</h1>
            <form className="form" onSubmit={this.onsubmitForm}>
              <label>
                TITLE
                <input
                  type="text"
                  className="input"
                  placeholder="Title"
                  onChange={this.handleTitle}
                />
              </label>
              <label>
                AMOUNT
                <input
                  type="text"
                  className="input"
                  placeholder="Amount"
                  onChange={this.handleAmount}
                />
              </label>
              <label>
                TYPE
                <select className="input" onChange={this.handleOptions}>
                  {transactionTypeOptions.map(each => (
                    <option value={each.optionId} key={each.optionId}>
                      {each.displayText}
                    </option>
                  ))}
                </select>
              </label>
              <button type="submit" className="add-button">
                Add
              </button>
            </form>
          </div>
          <div className="trans-history-container">
            <h1 className="history-para">History</h1>
            <ul className="all-transactions">
              <li className="sub-heading-container">
                <p className="sub-heading">Title</p>
                <p className="sub-heading">Amount</p>
                <p className="sub-heading">Type</p>
              </li>

              {transactionList.map(eachTrans => (
                <TransactionItem
                  transactionDetails={eachTrans}
                  key={eachTrans.id}
                  deleteClicked={this.deleteClicked}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default MoneyManager
