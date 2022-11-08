import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteClicked} = props
  const {id, title, amount, type} = transactionDetails

  const handleDelete = () => {
    deleteClicked(id)
  }

  return (
    <li className="table-row">
      <p className="transaction-text">{title}</p>
      <p className="transaction-text">Rs {amount}</p>
      <p className="transaction-text">{type}</p>
      <div className="delete-container">
        <button className="delete-button" type="button" onClick={handleDelete}>
          <img
            className="delete-img"
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            testid="delete"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
