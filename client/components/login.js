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
        this.setState({[event.target.name]: event.target.value})
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
        .then((credentials) => 
            firebase
            .firestore()
            .collection('users')
            .doc(credentials.user.uid)
            .set({
                name: this.state.name,
                email: this.state.email
            }))
        .catch(error => console.log(error.message))
    }

    render () {
        return (
            <div id="loginContainer">
                <p id="loginTitle">iDestination</p>

                {!this.state.logIn && !this.state.signUp && (
                    <div className="loginFormContainer">
                        <p onClick={() => this.setState({signUp: false, logIn: true})}>Log In</p>
                        <p onClick={() => this.setState({signUp: true, logIn: false})}>Sign Up</p>
                    </div>
                )}

                {this.state.logIn && !this.state.signUp && (
                    <div className="loginFormContainer">
                        <p>Email</p>
                        <input name="email" type="email" value={this.state.email} onChange={this.handleChange} required></input>
                        <p>Password</p>
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} required></input>
                        <p id="loginFormButton" onClick={this.handleLogin}>Log In</p>
                        <div id="loginBackButton" onClick={() => this.setState({signUp: false, logIn: false})}><MdArrowBack /></div>
                    </div>
                )}

                {!this.state.logIn && this.state.signUp && (
                    <div className="loginFormContainer">
                        <p>Name</p>
                        <input name="name" type="text" value={this.state.name} onChange={this.handleChange} required></input>
                        <p>Email</p>
                        <input name="email" type="email" value={this.state.email} onChange={this.handleChange} required></input>
                        <p>Password</p>
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} required></input>
                        <p id="loginFormButton" onClick={this.handleSignUp}>Sign Up</p>
                        <div id="loginBackButton" onClick={() => this.setState({signUp: false, logIn: false})}><MdArrowBack /></div>
                    </div>
                )}
            </div>
        )
    }
}