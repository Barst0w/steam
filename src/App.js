/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import { BrowserRouter, Route } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import fire from './fire'

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
    const [hasAccount, setHasAccount] = useState(false);

    const clearInputs = () => {
        setEmail('');
        setPassword('');
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
    }

    const handleLogout = () => {
        fire.auth().signOut();
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
    }, [])

    return(
        <div>
            <Navbar user={user} handleLogout={handleLogout}/>
            <BrowserRouter>
                <Route exact path="/"><Home /></Route>
                <Route exact path="/Login"><Login email={email} setEmail={setEmail} password={email} setPassword={setPassword} handleLogin={handleLogin} /></Route>
                <Route exact path="/Signup"><Signup email={email} setEmail={setEmail} password={password} setPassword={setPassword} emailError={emailError} passwordError={passwordError} handleSignup={handleSignup} handleLogin={handleLogin}/></Route>
            </BrowserRouter>
            <Footer />
        </div>
    )
}

export default App