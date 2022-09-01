import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const { fetch } = useFetch();
  const [user, setUser] = useState({});
  const [account, setAccount] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [accountList, setAccountList] = useState([]);

  const signup = async (data: any) => {
    if (await fetch('/auth/signup', 'POST', data)) {
      toast.success('Account successfully created');
      navigate('/');
    };
  }

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const loggedInUser = localStorage.getItem('user');
      if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        setUser(user);
      }
    }
    fetchLoggedInUser();
  }, []);


  const login = async (data: any) => {
    const response = await fetch('/auth/login', 'POST', data);
    if (response) {
      const { token, user } = response;
      localStorage.setItem('auth-token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setUser(user);
      toast.success('Successfully Login');
      if (user.hasLinkedAccount) {
        navigate('/app/dashboard');
      } else {
        navigate('/app/link-account');
      }
    }
  }

  const getAccountOverview = async () => {
    const response = await fetch('/accounts/overview', 'GET');
    if (response) {
      return response;
    }
  }

  const saveLinkedAccount = async (data: any) => {
    const response = await fetch('/accounts/save', 'POST', data);
    if (response) {
      setAccount(response);
      toast.success('Account successfully linked');
      if (location.pathname !== '/app/dashboard') {
        navigate('/app/dashboard');
      }
    }
  }


  const getAccountById = async () => {
    const response = await fetch('/accounts/default', 'GET');
    if (response) {
      setAccount(response);
    }
  }

  const getAccountList = async () => {
    const response = await fetch('/accounts/list', 'GET');
    if (response) {
      setAccountList(response);
    }
  }

  const getTransactionsByAccountId = useCallback(async (accountId: string) => {
      const response = await fetch(`/accounts/${accountId}/transactions`, 'GET');
    if (response) {
      setTransactions(response.data);
    }
  },[]);
  

  
  return {
    signup,
    login,
    user,
    saveLinkedAccount,
    account,
    getAccountById,
    accountList,
    getAccountList,
    transactions,
    getTransactionsByAccountId,
    getAccountOverview
  }

}

export default useAccount;