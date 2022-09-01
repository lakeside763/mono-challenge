import React, { useContext } from 'react';
import Logo from '../../assets/mono-black-logo.png';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import "./login.style.scss";
import { AppContext } from '../../context/app.context';

export type LoginFormValues = {
  email: string,
  password: string,
}

const Login = () => {
  const { login } = useContext(AppContext);
  const schema = Yup.object({
    email: Yup.string().required('First name is required'),
    password: Yup.string().required('Last name is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({ 
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: LoginFormValues) => {
    login(formData);
  }

  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="header"><img src={Logo}  alt="logo"/></div>
        <p>Securely login to your account</p>
        <div className="login-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Email"
                {...register('email')}
                name="email"
                className={errors.email?.message ? 'input-errors' : '' }
              />
              <span className="errors">{errors.email?.message}</span>
            </div>
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Password"
                {...register('password')}
                name="password"
                className={errors.password?.message ? 'input-errors' : '' }
              />
              <span className="errors">{errors.password?.message}</span>
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