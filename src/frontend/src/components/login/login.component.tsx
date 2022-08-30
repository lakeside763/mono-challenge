import React from 'react';
import Logo from '../../assets/mono-black-logo.png';
import "./login.style.scss";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


const Login = () => {
  const handleSubmit = (event: any) => {
    event.preventDefault();
    toast.success('Login successfully');
  }
  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="header"><img src={Logo}  alt="logo"/></div>
        <p>Securely login to your account</p>
        <div className="login-form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input name="email" placeholder="Email" />
              <span></span>
            </div>
            <div className="form-group">
              <input name="password" placeholder="Password" />
              <span></span>
            </div>
            <div className="form-group2">
              <div>
                <input name="rememberMe" type="checkbox" className="check-box" />
                <span>Remember me</span>
              </div>
              <div>
                <Link to="/#">Forgot password</Link>
              </div>
            </div>
            <div className="form-group">
              <button type="submit">Login</button>
              <span>
                Don't have an account? &nbsp;
                <Link to="/signup">Signup</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;