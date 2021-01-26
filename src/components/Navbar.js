import React from 'react'
import logo from '../assets/img/logo.svg'

function Navbar() {
    return(
        <div className="navbar">
            <div className="navContent">
                <img className="logo" src={logo} alt="" />
                <ul className="navbuttons1">
                    <li className="storeBtn">STORE</li>
                    <li className="communityBtn">COMMUNITY</li>
                    <li className="aboutBtn">ABOUT</li>
                    <li className="supportBtn">SUPPORT</li>
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