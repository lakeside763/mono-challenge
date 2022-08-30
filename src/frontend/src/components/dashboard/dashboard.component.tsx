import React, { Fragment } from 'react';

import './dashboard.style.scss'; 
import ExpensesTracker from './expenses-tracker/expenses-tracer.component';
import Expenses from './expenses/expenses.component';
import LatestTransactions from './latest-transactions/latest-transactions.component';
import TotalBalance from './total-balance/total-balance.component';

const Dashboard = () => {


  return (
    <Fragment>
      <div className="dashboard-container">
        <section className="section-wrapper">
          <ExpensesTracker />
          <LatestTransactions />
        </section>
        <aside className="aside-wrapper">
          <TotalBalance />
          <Expenses />
        </aside>
      </div>
    </Fragment>
    
  )
}

export default Dashboard