import React, { useContext, useEffect } from 'react'
import { FiArrowRight, FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { AppContext } from '../../context/app.context';
import { Link } from "react-router-dom";
import useLink from '../../hooks/use-link';

import './account-list.style.scss';

const AccountList = () => {
  const { monoConnect } = useLink();
  const { accountList, getAccountList } = useContext(AppContext);

  useEffect(() => {
    getAccountList();
  }, []);
  
  return (
    <div className="list-wrapper">
      <div className="heading">
        <h2>Account List</h2>
        <div>
          <span className="link-btn" onClick={() => monoConnect.open()}>
            <FiPlusCircle />
          </span>
        </div>
      </div>
      <table className="table-list">
        <thead>
          <tr className="table-head">
            <td>BANK</td>
            <td>ACCOUT NUMBER</td>
            <td>BANK CODE</td>
            <td>BALANCE</td>
            <td>Currency</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {accountList && accountList.map((list: any) => (
            <tr className="table-row" key={list._id}>
              <td>{list.bankName}</td>
              <td>{list.accountNumber}</td>
              <td>{list.bankCode}</td>
              <td>{list.balance}</td>
              <td>{list.currency}</td>
              <td>
                <span className="action-btn">
                  <Link to={`/app/list/${list.accountId}`}><FiArrowRight /></Link>
                  <FiTrash2 />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AccountList