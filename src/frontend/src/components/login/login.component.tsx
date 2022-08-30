import React from 'react';
import Logo from '../../assets/mono-black-logo.png';
import "./login.style.scss";

const Login = () => {
  const forgotPassword = '#';
  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="header"><img src={Logo}  alt="logo"/></div>
        <p>Securely login to your account</p>
        <div className="login-form">
          <form>
            <div className="form-group">
              <input name="email" placeholder="Email" />
              <span></span>
            </div>
            <div className="form-group">
              <input name="email" placeholder="Password" />
              <span></span>
            </div>
            <div className="form-group2">
              <div>
                <input type="checkbox" className="check-box" />
                <span>Remember me</span>
              </div>
              <div>
                <a href={forgotPassword}>Forgot password</a>
              </div>
            </div>
            <div className="form-group">
              <button type="submit">Login</button>
              <span>
                Don't have an account? &nbsp;
                <a href={forgotPassword}>Sign Up</a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;