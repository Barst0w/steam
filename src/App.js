/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import { BrowserRouter, Route } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react';
import { db, fire } from './fire'

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [username, setUsername] = useState('')

    const clearInputs = () => {
        setEmail('');
        setPassword('');
        setUsername('');
    }

    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }

    const handleLogin = () => {
        clearErrors();
        fire 
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch((err) => {
                switch (err.code) {
                    case "auth/invalid-email": 
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        setPasswordError(err.message);
                        break;
                }
            });
            db.collection('Users')
                .get()
                .then((snapshot) => {
                    snapshot.docs.forEach(doc => {
                        if (doc.data().Email === email) localStorage.setItem('username', doc.data().Username)
                    })
                })

            localStorage.setItem('about-chat', 'CHAT')
            localStorage.setItem('login-logout', 'Logout')
            console.log(localStorage.getItem('username'))
    };

    const handleSignup = () => {
        clearErrors();
        fire 
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch((err) => {
                switch (err.code) {
                    case "auth/email-already-in-use": 
                    case "auth/invalid-email":
                        setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        setPasswordError(err.message);
                        break;
                }
            });
            db.collection('Users').add({
                Username: username,
                Email: email,
            })
            .then(() => {
                alert('Your Registration is Complete')
            })
    }

    const handleLogout = () => {
        fire.auth().signOut();
        localStorage.setItem('about-chat', '')
        localStorage.setItem('username', '')
        localStorage.setItem('login-logout', '')
    }

    const authListener = () => {
        fire.auth().onAuthStateChanged(user => {
            if (user) {
                clearInputs();
                setUser(user);
            } else {
                setUser('');
            }
        })
    }

    useEffect(() => {
        authListener();
        if (localStorage.getItem('about-chat') !== '' && localStorage.getItem('about-chat') !== 'CHAT') localStorage.setItem('about-chat', '')
        if (localStorage.getItem('login-logout') !== '' && localStorage.getItem('login-logout') !== 'Logout') localStorage.setItem('login-logout', '')
    }, [])

    return(
        <div>
            <Navbar user={user} handleLogout={handleLogout} />
            <BrowserRouter>
                <Route exact path="/"><Home /></Route>
                <Route exact path="/Login"><Login email={email} setEmail={setEmail} password={email} setPassword={setPassword} handleLogin={handleLogin} /></Route>
                <Route exact path="/Signup"><Signup setUsername={setUsername} email={email} setEmail={setEmail} password={password} setPassword={setPassword} emailError={emailError} passwordError={passwordError} handleSignup={handleSignup} handleLogin={handleLogin}/></Route>
            </BrowserRouter>
            <Footer />
        </div>
    )
}

export default App