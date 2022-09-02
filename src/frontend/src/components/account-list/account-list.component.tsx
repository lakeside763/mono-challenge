/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from 'react'
import { FiArrowRight, FiPlusCircle, FiTrash2 } from 'react-icons/fi';
import { Link } from "react-router-dom";
import MonoConnect from '@mono.co/connect.js';

import './account-list.style.scss';
import useAccount from '../../hooks/use-account';

const AccountList = () => {
  const { getAccountList, saveLinkedAccount, unlinkAccount } = useAccount();
  const [accountList, setAccountList] = useState<any[]>([]);
  const [code, setCode] = useState<string>();

  const monoConnect = useMemo(() => {
    const monoInstance = new MonoConnect({
      key: process.env.REACT_APP_MONO_TEST_PK,
      onSuccess: ({ code }: { code: string }) => setCode(code),
    });
    monoInstance.setup();
    return monoInstance;
  }, []);

  useEffect(() => {
    const fetchAccountList = async () => {
      const response = await getAccountList();
      setAccountList(response);
    }
    fetchAccountList();
  }, []);

  useEffect(() => {
    if (code) {
      const generateAccountId = async () => {
        const response = await fetch('https://api.withmono.com/account/auth', {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "mono-sec-key": process.env.REACT_APP_MONO_TEST_SK!,
          },
          body: JSON.stringify({ code }),
        });
        const { id } = await response.json();
        const account = await saveLinkedAccount({ accountId: id, code });
        const updatedAccountList: any[] = [...accountList, account];
        setAccountList(updatedAccountList)
      };
      generateAccountId();
    }
  }, [code]);

  const unlink = async (accountId: string) => {
    console.log(accountId)
    const response = await fetch(`https://api.withmono.com/accounts/${accountId}/unlink`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "mono-sec-key": process.env.REACT_APP_MONO_TEST_SK!,
      },
    });
    if (response.status === 200) {
      const accounts = await unlinkAccount(accountId);
      console.log(accounts);
      setAccountList(accounts);
    } 
  }

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
                  <span className="unlink" onClick={() => unlink(list.accountId)}><FiTrash2 /></span>
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