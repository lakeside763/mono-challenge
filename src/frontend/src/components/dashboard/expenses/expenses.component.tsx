import React from 'react';
import './expenses.styles.scss';

const Expenses = () => {
  return (
    <div className="expenses">
      <div className="sub-title">
        <h3>Where your money go?</h3>
      </div>

      <div className="list">
        <div className="spending">
          <h3 className="desc">Food and Drinks</h3>
          <p>872.400</p>
        </div>
        <div className="progress-bar">
          <div className="length"></div>
        </div>
      </div>

      <div className="list">
        <div className="spending">
          <h3 className="desc">Shopping</h3>
          <p>872.400</p>
        </div>
        <div className="progress-bar">
          <div className="length"></div>
        </div>
      </div>

      <div className="list">
        <div className="spending">
          <h3 className="desc">Housing</h3>
          <p>872.400</p>
        </div>
        <div className="progress-bar">
          <div className="length"></div>
        </div>
      </div>

      <div className="list">
        <div className="spending">
          <h3 className="desc">Transportation</h3>
          <p>872.400</p>
        </div>
        <div className="progress-bar">
          <div className="length"></div>
        </div>
      </div>
    </div>
  )
}

export default Expenses;