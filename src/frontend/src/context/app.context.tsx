import React, { createContext } from 'react';
import { LoginFormValues } from '../components/login/login.component';
import { SignupFormValues } from '../components/signup/signup.component';
import useAccount, { UserInterface } from '../hooks/use-account';



interface AppContextInterface {
  signup: (data: SignupFormValues) => {}
  login: (data: LoginFormValues) => {}
  user: UserInterface,
  auth: false
  logout: () => {}
  saveLinkedAccount: (data: any) => {}
  account: any,
  getAccountDetailsById: (accountId: string) => {}
  accountList: any
  getAccountList: () => []
  transactions: any[];
  getTransactionsByAccountId: (data: any) => []
  getAccountOverview: () => {}
}

export const AppContext = createContext({} as AppContextInterface);

const AppProvider = ({ children }: any) => {
  const { ...rest } = useAccount();
  const value: any = { ...rest };
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider;