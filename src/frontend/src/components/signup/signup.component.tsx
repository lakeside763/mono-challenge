import React from 'react';
import Logo from '../../assets/mono-black-logo.png';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './signup.style.scss';
import useAccount from '../../hooks/use-account';

export type SignupFormValues = {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}

const Signup = () => {
  const { signup } = useAccount();
  const schema = Yup.object({
    firstName: Yup.string().min(2).required('First name is required'),
    lastName: Yup.string().min(2).required('Last name is required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(6).required('Password is required').matches(/^\S*$/, 'Whitespace is not allowed'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    mode: 'onTouched',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData: SignupFormValues) => {
    await signup(formData);
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="header"><img src={Logo}  alt="logo"/></div>
        <p>Track all your bank expenses in one place</p>
        <div className="login-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-div-justify">
              <div className="form-group">
                <input 
                  type="text" 
                  placeholder="First Name"
                  {...register('firstName')}
                  name="firstName"
                  required
                  className={errors.firstName?.message ? 'input-error' : '' }
                />
                <span className="errors">{errors.firstName?.message}</span>
              </div>
              <div className="form-group child-width-10px">
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  {...register('lastName')}
                  name="lastName"
                  required
                  className={errors.lastName?.message ? 'input-error' : '' }
                />
                <span className="errors">{errors.lastName?.message}</span>
              </div>
            </div>
            <div className="form-group">
              <input 
                type="email" 
                placeholder="Email" 
                {...register('email')}
                name="email"
                required
                className={errors.email?.message ? 'input-error' : '' }
              />
              <span className="errors">{errors.email?.message}</span>
            </div>
            <div className="form-group">
              <input 
                
                type="password" 
                placeholder="Password" 
                {...register('password')}
                name="password" 
                required
                className={errors.password?.message ? 'input-error' : '' }
              />
              <span className="errors">{errors.password?.message}</span>
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