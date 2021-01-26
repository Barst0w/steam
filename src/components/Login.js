import React from 'react';

function Login(props) {

    const registerSubmit = (e) => {
        e.preventDefault()
        props.handleLogin()
    }

    return(
    <div className="loginpage">
        <div className="login">
            <form>
                <p className="formTitle">SIGN IN</p>
                <p className="loginText">Email</p>
                <input type="text" onChange={(e) => props.setEmail(e.target.value)}></input>
                <p className="errormessage">{props.emailError}</p>
                <p className="loginText">Password</p>
                <input type="text" onChange={(e) => props.setPassword(e.target.value)}></input>
                <p className="errormessage">{props.passwordError}</p>
                <button onClick={registerSubmit}>Sign In</button>
                <p className="passwordReset">Forgot Your Password?</p>
                <li className="signupBtn"><a href="/Signup">Sign Up</a></li>
            </form>
        </div>
    </div>
    )
}

export default Login