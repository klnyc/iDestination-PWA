import React from 'react'
import { MdArrowBack } from 'react-icons/md'

export default class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            name: '',
            signUp: false,
            logIn: false
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleSignUp = this.handleSignUp.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleLogin(event) {
        event.preventDefault()
        firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .catch(error => console.log(error.message))
    }

    handleSignUp(event) {
        event.preventDefault()
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .catch(error => console.log(error.message))
    }

    render () {
        return (
            <div id="loginContainer">
                <p id="loginTitle">iDestination</p>

                {!this.state.logIn && !this.state.signUp && (
                    <div id="loginFormContainer">
                        <p onClick={() => this.setState({signUp: false, logIn: true})}>Log In</p>
                        <p onClick={() => this.setState({signUp: true, logIn: false})}>Sign Up</p>
                    </div>
                )}

                {this.state.logIn && !this.state.signUp && (
                    <div id="loginFormContainer">
                        <form id="loginForm" onSubmit={this.handleLogin}>
                            <label htmlFor="email">Email</label>
                            <input name="email" type="email" value={this.state.email} onChange={this.handleChange} required></input>
                            <label htmlFor="password">Password</label>
                            <input name="password" type="password" value={this.state.password} onChange={this.handleChange} required></input>
                            <button id="loginFormButton" type="submit">Log In</button>
                            <div id="loginBackButton" onClick={() => this.setState({signUp: false, logIn: false})}><MdArrowBack /></div>
                        </form>
                    </div>
                )}

                {!this.state.logIn && this.state.signUp && (
                    <div id="loginFormContainer">
                        <form id="loginForm" onSubmit={this.handleSignUp}>
                            <label htmlFor="name">Name</label>
                            <input name="name" type="text" value={this.state.name} onChange={this.handleChange} required></input>
                            <label htmlFor="email">Email</label>
                            <input name="email" type="email" value={this.state.email} onChange={this.handleChange} required></input>
                            <label htmlFor="password">Password</label>
                            <input name="password" type="password" value={this.state.password} onChange={this.handleChange} required></input>
                            <button id="loginFormButton" type="submit">Sign Up</button>
                            <div id="loginBackButton" onClick={() => this.setState({signUp: false, logIn: false})}><MdArrowBack /></div>
                        </form>
                    </div>
                )}
            </div>
        )
    }
}