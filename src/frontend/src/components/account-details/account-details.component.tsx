/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { AppContext } from '../../context/app.context';

import './account-details.style.scss';


const AccountDetails = () => {
  const { id } = useParams();
  const { account, getAccountDetailsById, transactions, getTransactionsByAccountId } = useContext(AppContext);

  console.log(transactions);

  useEffect(() => {
      if (id) {
        getAccountDetailsById(id!);
        getTransactionsByAccountId(id);
      }
  }, [id]);
  return (
    <div className="details-wrapper">
      <h3>{account.name} - {account?.institution?.name }</h3>
      <div className="other-info">
        <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{account.name}</td>
              </tr>
              <tr>
                <td>Currency</td>
                <td>{account.currency}</td>
              </tr>
              <tr>
                <td>Account Number</td>
                <td>{account.accountNumber}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>{account.type}</td>
              </tr>
              <tr>
                <td>Bank Code</td>
                <td>{account?.institution?.bankCode}</td>
              </tr>
              <tr>
                <td>Banking Type</td>
                <td>{account?.institution?.type}</td>
              </tr>
              <tr>
                <td>Balance</td>
                <td>{parseInt(account?.balance).toLocaleString()}</td>
              </tr>
            </tbody>
        </table>
      </div>
      <div>
      <div className="transactions-list">
          <h3>Transactions</h3>
          <table>
            <thead>
              <tr>
                <td>Narration</td>
                <td>Amount</td>
                <td>Type</td>
                <td>Date</td>
                <td>Balance</td>
              </tr>
            </thead>
            <tbody>
              {transactions && transactions.map((transaction) => {
                return (
                  <tr key={transaction.balance}>
                    <td>{transaction.narration.slice(0, 9)}...</td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.type}</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.balance}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AccountDetails