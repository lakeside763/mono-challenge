import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/dashboard.component';
import LinkAccount from './components/link-account/link-account.component';
import Login from './components/login/login.component';
import Signup from './components/signup/signup.component';
import Home from './routes/home/home.component';

function App() {
  
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Login />}/>
        <Route path="/signup" element={<Signup />} />
        <Route path='/app' element={<Home />}>
          <Route path="/app/dashboard" element={<Dashboard />} />
          <Route path="/app/link-account" element={<LinkAccount />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App;
