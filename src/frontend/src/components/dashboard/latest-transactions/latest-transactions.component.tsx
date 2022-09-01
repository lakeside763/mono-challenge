import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

import './latest-transactions.style.scss';

const LatestTransactions = ({ transactions }: any) => {
  
  const firstLetter = (text: string) => text.charAt(0);

  return (
    <div className="latest-transactions">
      <div className="sub-title">
        <h3>Latest Transactions</h3>
        <FiMoreHorizontal />
      </div>

      <div className="transactions-list">
        {transactions && transactions.map((transaction: any) => {
          const { amount, balance, narration, date, type } = transaction
          return (
            <div className="transaction" key={balance}>
              <div className="icon-text">{firstLetter(narration)}</div>
                <div className="narration">
                  <div className="desc">
                    <p className="title">{narration.slice(0, 10)}...</p>
                    <div className="more-desc">
                      <span>{date}</span>
                      {/* <span><i></i>8.12 am</span> */}
                      <span><i></i>-{type}</span>
                    </div>
                  </div>
                  <div className="amount">
                    <p className="title">{type === 'debit' ?'-': '+' }{parseInt(amount).toLocaleString()}</p>
                  </div>
                </div>
              </div>
          )
        })}
        
      </div>

    </div>
  )
}

export default LatestTransactions;