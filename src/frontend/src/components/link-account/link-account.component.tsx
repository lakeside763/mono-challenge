import React, { Fragment } from 'react'
import { FiLock } from 'react-icons/fi';
import './link-account.style.scss';

const LinkAccount = () => {

  return (
    <Fragment>
      <div className="link-account-wrapper">
        <div className="container">
          <div className="icon">
            <FiLock />
          </div>
          <div className="text">
            <h2>Final Step</h2>
            <p>Link your Bank Account in seconds</p>
            <button>Link Now</button>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default LinkAccount