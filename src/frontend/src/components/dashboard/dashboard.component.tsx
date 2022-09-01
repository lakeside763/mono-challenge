/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment,  useEffect, useState } from 'react';
import useAccount from '../../hooks/use-account';

import './dashboard.style.scss'; 
import ExpensesTracker from './expenses-tracker/expenses-tracer.component';
import Expenses from './expenses/expenses.component';
import LatestTransactions from './latest-transactions/latest-transactions.component';
import TotalBalance from './total-balance/total-balance.component';

const Dashboard = () => {
  const { getAccountOverview } = useAccount();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchAccountOverview = async () => {
      const overview = await getAccountOverview();
      setData(overview);
    }
    fetchAccountOverview();
  }, []);
  

  return (
    <Fragment>
      <div className="dashboard-container">
        <section className="section-wrapper">
          <div className="mobile-view">
            <TotalBalance totalBalance={data.totalBalance} />
          </div>
          <ExpensesTracker />
          <LatestTransactions transactions={data.transactions} />
        </section>
        <aside className="aside-wrapper">
          <div className="web-view">
            <TotalBalance totalBalance={data.totalBalance} />
          </div>
          <Expenses />
        </aside>
      </div>
    </Fragment>
    
  )
}

export default Dashboard