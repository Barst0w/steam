import React, { useEffect, useState } from 'react'
import logo from '../assets/img/logo.svg'

function Navbar(props) {
    let username = '';
    let aboutChat = '';
    let loginLogout = '';

    if (localStorage.getItem('username')) {
        username = <li className="profileBtn">{localStorage.getItem('username')}</li>
    } else {
        username = '';
    }
    
    if (localStorage.getItem('about-chat')) {
        aboutChat = <li className="aboutBtn">{localStorage.getItem('about-chat')}</li>
    } else {
        aboutChat = <li className="aboutBtn">ABOUT</li>;
    }

    if (localStorage.getItem('login-logout')) {
        loginLogout = <li className="loginBtn" onClick={props.handleLogout}><a href="/Login">Logout</a></li>
    } else {
        loginLogout = <li className="loginBtn"><a href="/Login">Login</a></li>
    }
    
    return(
        <div className="navbar">
            <div className="navContent">
                <img className="logo" src={logo} alt="" />
                <ul className="navbuttons1">
                    <li className="storeBtn"><a href="/">STORE</a></li>
                    <li className="communityBtn">COMMUNITY</li>
                    {username}
                    {aboutChat}
                    <li className="supportBtn">SUPPORT</li>
                </ul>
                <ul className="navbuttons2">
                    <li className="installSteamBtn">Install Steam</li>
                    {loginLogout}
                    <li className="languageBtn">language</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar