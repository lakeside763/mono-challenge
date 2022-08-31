import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useFetch from './use-fetch';

interface UserInterface {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  hasLinkedAccount: string,
  createdAt: string,
  updatedAt: string
}

const useAccount = () => {
  const navigate = useNavigate();
  const { fetch } = useFetch();
  const [user, setUser] = useState<UserInterface>();
  const [defaultAccount, setDefaultAccount] = useState({});

  const signup = async (data: any) => {
    if (await fetch('/auth/signup', 'POST', data)) {
      toast.success('Account successfully created');
      navigate('/');
    };
  }

  const login = async (data: any) => {
    const response = await fetch('/auth/login', 'POST', data);
    if (response) {
      const { token, user } = response;
      localStorage.setItem('auth-token', token);
      setUser(user);
      toast.success('Successfully Login');
      if (user.hasLinkedAccount) {
        navigate('/app/dashboard');
      } else {
        navigate('/app/link-account');
      }
    }
  }

  const saveLinkedAccount = async (data: any) => {
    const response = await fetch('/accounts/save', 'POST', data);
    if (response) {
      toast.success('Account successfully linked');
      navigate('/app/dashboard');
    }
  }

  const getDefaultAccount = async () => {
    const response = await fetch('/account/default-balance', 'GET');
    if (response) {
      console.log(response);
      setDefaultAccount(response);
    }
  }


  return {
    signup,
    login,
    user,
    saveLinkedAccount,
    defaultAccount,
    getDefaultAccount,
  }

}

export default useAccount;