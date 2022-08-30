import React from 'react';
import Logo from '../../assets/mono-black-logo.png';
import { Link } from 'react-router-dom';

import './signup.style.scss';

const Signup = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <div className="header"><img src={Logo}  alt="logo"/></div>
        <p>Track all your bank expenses in one place</p>
        <div className="login-form">
          <form>
            <div className="flex-div-justify">
              <div className="form-group">
                <input name="firstName" type="text" placeholder="First Name" />
                <span></span>
              </div>
              <div className="form-group child-width-10px">
                <input name="lastName" type="text" placeholder="Last Name" />
                <span></span>
              </div>
            </div>
            <div className="form-group">
              <input name="email" type="email" placeholder="Email" />
              <span></span>
            </div>
            <div className="form-group">
              <input name="password" type="password" placeholder="Password" />
              <span></span>
            </div>
            
            <div className="form-group">
              <button type="submit">Get Started</button>
              <span>
                Already have an account? &nbsp;
                <Link to="/">Sign in</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup;