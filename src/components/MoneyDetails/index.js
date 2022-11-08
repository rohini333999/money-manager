import './index.css'

const MoneyDetails = props => {
  const {incomeAmount, expensesAmount, balanceAmount} = props
  return (
    <ul className="money-details">
      <div className="balance-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="money-image"
        />
        <div className="display-money">
          <p className="money-para">Your Balance</p>
          <p className="money-display-para" testid="balanceAmount">
            Rs {balanceAmount}
          </p>
        </div>
      </div>

      <div className="balance-container income">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="money-image"
        />
        <div className="display-money ">
          <p className="money-para">Your Income</p>
          <p className="money-display-para" testid="incomeAmount">
            Rs {incomeAmount}
          </p>
        </div>
      </div>

      <div className="balance-container expense">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="money-image"
        />
        <div className="display-money">
          <p className="money-para">Your Expenses</p>
          <p className="money-display-para" testid="expensesAmount">
            Rs {expensesAmount}
          </p>
        </div>
      </div>
    </ul>
  )
}

export default MoneyDetails
