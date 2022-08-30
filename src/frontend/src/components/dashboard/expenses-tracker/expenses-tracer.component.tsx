import React from 'react';
import ExpenseTracker from '../../../assets/expense-tracker.jpg';
import './expenses-tracker.style.scss';

const ExpensesTracker = () => {
  return (
    <div className="expense-tracker">
      <img src={ExpenseTracker} alt="expenses tracker"/>
    </div>
)
}
export default ExpensesTracker