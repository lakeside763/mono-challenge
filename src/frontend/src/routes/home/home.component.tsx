import React, { useContext, useRef, Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import  logo from '../../assets/mono-white-logo.png';
import LoginUser from '../../assets/user-avatar.jpg'
import { AppContext } from '../../context/app.context';
import { FiLogOut } from 'react-icons/fi';
import  { useLocation } from 'react-router-dom';
import './home.style.scss';

function Home() {
  const { user, logout } = useContext(AppContext);
  const location = useLocation();

  const pathname = location.pathname;

  const closeNavRef = useRef<HTMLSpanElement | any>(null);
  const openNavRef = useRef<HTMLSpanElement | any>(null);
  const sideNavRef = useRef<HTMLDivElement | any>(null);
  const mainDivRef = useRef<HTMLDivElement | any>(null);

  const handleOpenNavBtn = () => {
    sideNavRef.current.style.width = "250px";
    mainDivRef.current.style.marginLeft = "250px";
    openNavRef.current.style.display = "none";
  }

  const handleCloseNavBtn = () => {
    sideNavRef.current.style.width = "0";
    mainDivRef.current.style.marginLeft = "0";
    openNavRef.current.style.display = "block";
  }

  return (
    <div className="home-wrapper">
      <div className="sidenav" ref={sideNavRef}>
        <div className="logo">
          <div><img src={logo} alt="logo" /></div>
          <span onClick={handleCloseNavBtn} ref={closeNavRef} className="close-btn">&times;</span>
        </div>
        {pathname !== '/app/link-account' ? (
          <Fragment>
            <Link to="/app/dashboard" >Dashboard</Link>
            <Link to="/app/list" >Accounts</Link>
            <Link to="/app/settings" >Settings</Link>
          </Fragment>
        ): ''}
          <Link to="/#" onClick={logout} className="flex-link">
                <span>Logout</span> <FiLogOut />
          </Link>
      </div>
      <main className="main" ref={mainDivRef}>
        <div className="top-bar-wrapper">
          <span onClick={handleOpenNavBtn} ref={openNavRef} className="open-nav">&#9776; </span>
          <div className="top-bar">
            <div className="login-user">
              <span>Hi, {user.firstName}</span>
              <div className='avatar'>
                <img src={LoginUser} alt="login user"/>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  )
}

export default Home;
