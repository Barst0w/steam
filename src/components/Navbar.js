import React from 'react'
import logo from '../assets/img/logo.svg'

function Navbar() {
    return(
        <div className="navbar">
            <div className="navContent">
                <img className="logo" src={logo} alt="" />
                <ul className="navbuttons1">
                    <li className="storeBtn"><a href="/">STORE</a></li>
                    <li className="communityBtn"><a href="/Community">COMMUNITY</a></li>
                    <li className="aboutBtn"><a href="/About">ABOUT</a></li>
                    <li className="supportBtn"><a href="/Support">SUPPORT</a></li>
                </ul>
                <ul className="navbuttons2">
                    <li className="installSteamBtn">Install Steam</li>
                    <li className="loginBtn"><a href="/">login</a></li>
                    <li className="languageBtn">language</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar