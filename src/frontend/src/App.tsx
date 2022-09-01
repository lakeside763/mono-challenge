import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard.component';
import LinkAccount from './components/link-account/link-account.component';
import Login from './components/login/login.component';
import Signup from './components/signup/signup.component';
import Home from './routes/home/home.component';
import { Toaster } from 'react-hot-toast';
import AccountList from './components/account-list/account-list.component';
import AccountDetails from './components/account-details/account-details.component';
import Settings from './components/settings/settings.component';

function App() {
  
  return (
    <Fragment>
      <Routes>
        <Route path="/">
          <Route index element={<Login />}/>
          <Route path="/signup" element={<Signup />} />
          <Route path='/app' element={<Home />}>
            <Route path="/app/dashboard" element={<Dashboard />} />
            <Route path="/app/link-account" element={<LinkAccount />} />
            <Route path="/app/list" element={<AccountList />} />
            <Route path="/app/account/:id" element={<AccountDetails />} />
            <Route path="/app/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
      <Toaster position="top-right" reverseOrder={false}/>
    </Fragment>
  )
}

export default App;
