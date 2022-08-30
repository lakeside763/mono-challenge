import React, { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import  logo from '../../assets/mono-white-logo.png';
import './home.style.scss';

function Home() {
  const link = '';
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
        <a href={link} >Dashboard</a>
        <a href={link} >Expenses</a>
        <a href={link} >Wallets</a>
        <a href={link} >Summary</a>
        <a href={link} >Accounts</a>
        <a href={link} >Settings</a>
      </div>
      <main className="main" ref={mainDivRef}>
        <div className="top-bar-wrapper">
          <span onClick={handleOpenNavBtn} ref={openNavRef} className="open-nav">&#9776; </span>
          <div className="top-bar">
            <h2>Mono</h2>
          </div>
        </div>
        <Outlet />
      </main>
    </div>
  )
}

export default Home;
