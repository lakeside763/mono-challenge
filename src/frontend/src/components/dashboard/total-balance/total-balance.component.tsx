import React from 'react';
import LinkBankLogo from '../../../assets/link-bank-logo.png';

import { FiPlusCircle } from 'react-icons/fi';

import './total-balance.style.scss'
import useLink from '../../../hooks/use-link';

const TotalBalance = ({ totalBalance }: any) => {
  const { monoConnect } = useLink();
  
  return (
    <div className="account">
      <div className="figure">
        <h3 className="figure-child">Total Balance</h3>
        <h1 className="figure-child">{parseInt(totalBalance).toLocaleString()}</h1>
        <p>Your balance across all Banks</p>
      </div>
      
      <div className="button">
        <div className="add-link">
          <img src={LinkBankLogo} alt="link bank logo" />
          <span className="link-btn" onClick={() => monoConnect.open()}>
            <FiPlusCircle />
          </span>
        </div>
        <div className="unlink" title="Link an account">
          <button className="warning-btn">UNLINK BANK ACCOUNT</button>
        </div>
      </div>
    </div>
  )
}

export default TotalBalance;