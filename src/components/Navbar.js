import React, { useEffect, useState } from 'react'
import logo from '../assets/img/logo.svg'

function Navbar(props) {
    const [loggedin, setLoggedin] = useState('Login')

    const checkState = () => {
        if (props.user) {
            props.handleLogout()
        }
    }

    useEffect(() => {
        if (props.user) {
            setLoggedin('Logout')
        } 
    }, [props.user])

    return(
        <div className="navbar">
            <div className="navContent">
                <img className="logo" src={logo} alt="" />
                <ul className="navbuttons1">
                    <li className="storeBtn"><a href="/">STORE</a></li>
                    <li className="communityBtn">COMMUNITY</li>
                    <li className="aboutBtn">ABOUT</li>
                    <li className="supportBtn">SUPPORT</li>
                </ul>
                <ul className="navbuttons2">
                    <li className="installSteamBtn">Install Steam</li>
                    <li className="loginBtn" onClick={checkState}><a href="/Login">{loggedin}</a></li>
                    <li className="languageBtn">language</li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar