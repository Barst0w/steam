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
    const [country, setCountry] = useState(localStorage.getItem('countryStorage'))
    const [description, setDescription] = useState(localStorage.getItem('descriptionStorage'))
    const [imageid, setimageid] = useState(localStorage.getItem('avatarStorage'))
// Clears all inputs at certain points for state / storage reasons
    const clearInputs = () => {
        setEmail('');
        setPassword('');
        setUsername('');
    }
// Clears all errors at certain points for state / storage reasons
    const clearErrors = () => {
        setEmailError('');
        setPasswordError('');
    }
// Grabs state info, checks if has account with Firebase, sets Username in localstorage from Firebase storage, and changes navbar to logged in, then runs function which grabs more info and stores it in localstorage.
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
                        if (doc.data().Email === email) {
                         localStorage.setItem('username', doc.data().Username)
                         updateProfileStates()
                        }
                    })
                })

            localStorage.setItem('about-chat', 'CHAT')
            localStorage.setItem('login-logout', 'Logout')
    };
// Uses input states to sign up with auth, sets default profile information to seperate firebase storage container.
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
                db.collection('Profiles').doc(username).set({
                    Country: country,
                    Description: description,
                    Avatar: imageid,
                })
                alert('Your Registration is Complete')
            })
            handleLogin()
    }
// Signs out of Firebase auth / local storage, and resets all values.
    const handleLogout = () => {
        fire.auth().signOut();
        localStorage.setItem('about-chat', '')
        localStorage.setItem('username', '')
        localStorage.setItem('login-logout', '')
    }
// Updates local storage with state to be used by other functions and sets profile information if edited by user.
    const updateProfile = () => {    
        db.collection('Profiles').doc(localStorage.getItem('username')).set({
            Country: country,
            Description: description,
            Avatar: imageid,
        })
        .then(() => {
            alert('You have edited your profile')
        })
        localStorage.setItem('avatarStorage', imageid)
        localStorage.setItem('countryStorage', country)
        localStorage.setItem('descriptionStorage', description)
    }
// Sets local storage when user already has a profile, and gets data from firebase storage.
    const updateProfileStates = () => {
        db.collection('Profiles').doc(localStorage.getItem('username')).get().then((doc) => {
            localStorage.setItem('countryStorage', doc.data().Country)
            localStorage.setItem('descriptionStorage', doc.data().Description)
            localStorage.setItem('avatarStorage', doc.data().Avatar)
        })
    }
// Checks for any changes in the auth, and does conditional checks.
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
// Changes navbar information / defaults, depending if logged in or not.
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
                <Route exact path="/EditProfile"><EditProfile setimageid={setimageid} updateProfileStates={updateProfileStates} updateProfile={updateProfile} setCountry={setCountry} setDescription={setDescription} country={country} description={description}/></Route>
                <Route exact path="/Login"><Login setEmail={setEmail} setPassword={setPassword} handleLogin={handleLogin} emailError={emailError} passwordError={passwordError}/></Route>
                <Route exact path="/Signup"><Signup setUsername={setUsername} setEmail={setEmail} setPassword={setPassword} emailError={emailError} passwordError={passwordError} handleSignup={handleSignup}/></Route>
                <Route exact path="/Profile"><Profile imageid={imageid} country={country} description={description} updateProfileStates={updateProfileStates}/></Route>
            </BrowserRouter>
            <Footer />
        </div>
    )
}

export default App