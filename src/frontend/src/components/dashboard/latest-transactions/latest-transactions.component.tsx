import React from 'react';
import { FiMoreHorizontal } from 'react-icons/fi';

import './latest-transactions.style.scss';

const LatestTransactions = () => {
  return (
    <div className="latest-transactions">
      <div className="sub-title">
        <h3>Latest Transactions</h3>
        <FiMoreHorizontal />
      </div>

      <div className="transactions-list">
        <div className="transaction">
          <div className="icon-text">J</div>
          <div className="narration">
            <div className="desc">
              <p className="title">Jumia food</p>
              <div className="more-desc">
                <span>11-11-2021</span>
                <span><i></i>8.12 am</span>
                <span><i></i>Credit</span>
              </div>
            </div>
            <div className="amount">
              <p className="title">-10800</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LatestTransactions;