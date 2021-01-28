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
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';

function App() {
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [username, setUsername] = useState('')
    const [country, setCountry] = useState('')
    const [description, setDescription] = useState('')

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
            handleLogin()
    }

    const handleLogout = () => {
        fire.auth().signOut();
        localStorage.setItem('about-chat', '')
        localStorage.setItem('username', '')
        localStorage.setItem('login-logout', '')
    }

    const updateProfile = () => {
        db.collection('Profiles').doc(localStorage.getItem('username')).set({
            Country: country,
            Description: description,
        })
        .then(() => {
            alert('Profile Updated')
        })
    }

    const updateProfileStates = () => {
        db.collection('Profiles').doc(localStorage.getItem('username')).get().then((doc) => {
            setCountry(doc.data().Country)
            setDescription(doc.data().Description)
        })
        console.log(country)
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
                <Route exact path="/EditProfile"><EditProfile updateProfileStates={updateProfileStates} updateProfile={updateProfile} setCountry={setCountry} setDescription={setDescription} country={country} description={description}/></Route>
                <Route exact path="/Login"><Login setEmail={setEmail} setPassword={setPassword} handleLogin={handleLogin} emailError={emailError} passwordError={passwordError}/></Route>
                <Route exact path="/Signup"><Signup setUsername={setUsername} setEmail={setEmail} setPassword={setPassword} emailError={emailError} passwordError={passwordError} handleSignup={handleSignup}/></Route>
                <Route exact path="/Profile"><Profile country={country} description={description} updateProfileStates={updateProfileStates}/></Route>
            </BrowserRouter>
            <Footer />
        </div>
    )
}

export default App