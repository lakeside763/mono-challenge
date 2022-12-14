import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import useFetch from './use-fetch';

export interface UserInterface {
  _id: string,
  firstName: string,
  lastName: string,
  email: string,
  hasLinkedAccount: string,
  defaultAccountId: string,
  createdAt: string,
  updatedAt: string
}

const useAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetch } = useFetch();
  const [user, setUser] = useState({});
  const [auth, setAuth] = useState(false);
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
        setAuth(true);
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
      setAuth(true);
      toast.success('Successfully Login');
      if (user.hasLinkedAccount) {
        navigate('/app/dashboard');
      } else {
        navigate('/app/link-account');
      }
    }
  }

  const logout = async () => {
    const response = await fetch('/auth/logout', 'POST');
    if (response) {
      setUser({});
      setAuth(false);
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user');
      toast.success(response.message);
      navigate('/');
    }
  }

  const getAccountOverview = async () => {
    const response = await fetch('/accounts/overview', 'GET');
    if (response) {
      return response;
    } else {
      navigate('/app/link-account');
    }
  }

  const saveLinkedAccount = async (data: any) => {
    const response = await fetch('/accounts/save', 'POST', data);
    if (response) {
      setAccount(response);
      toast.success('Account successfully linked');
      if (location.pathname === '/app/link-account') {
        navigate('/app/dashboard');
      }
      return response;
    }
  }

  const getAccountDetailsById = async (id: string) => {
    const response = await fetch(`/accounts/${id}`, 'GET');
    if (response.account) {
      setAccount(response.account);
    }
  }

  const getAccountList = async () => {
    const response = await fetch('/accounts/list', 'GET');
    if (response) {
      setAccountList(response);
      return response;
    }
  }

  const getTransactionsByAccountId = async (accountId: string) => {
      const response = await fetch(`/accounts/${accountId}/transactions`, 'GET');
    if (response) {
      setTransactions(response.data);
    }
  };
  

  const unlinkAccount = async (accountId: string) => {
    const response = await fetch(`/accounts/${accountId}/unlink`, 'POST');
    if (response) {
      setAccountList(response);
      toast.success('Account unlinked successfully');
      return response;
    }
  }

  
  return {
    signup,
    login,
    user,
    auth,
    logout,
    saveLinkedAccount,
    account,
    getAccountDetailsById,
    accountList,
    getAccountList,
    transactions,
    getTransactionsByAccountId,
    getAccountOverview,
    unlinkAccount
  }

}

export default useAccount;