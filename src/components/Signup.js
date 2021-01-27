import React from 'react';

function Signup(props) {

    const registerSubmit = (e) => {
        e.preventDefault()
        props.handleSignup()
    }

    return(
    <div className="signuppage">
        <div className="signup">
            <form>
                <p className="formTitle">SIGN UP</p>
                <p className="loginText">Email</p>
                <input type="text" onChange={(e) => props.setEmail(e.target.value)}></input>
                <p className="errormessage">{props.emailError}</p>
                <p className="loginText">Username</p>
                <input type="text" onChange={(e) => props.setUsername(e.target.value)}></input>
                <p className="loginText">Password</p>
                <input type="text" onChange={(e) => props.setPassword(e.target.value)}></input>
                <p className="errormessage">{props.passwordError}</p>
                <button onClick={registerSubmit}>Register</button>
                <p className="passwordReset">Forgot Your Password?</p>
                <li className="signupBtn"><a href="/Login">Login</a></li>
            </form>
        </div>
    </div>
    )
}

export default Signup