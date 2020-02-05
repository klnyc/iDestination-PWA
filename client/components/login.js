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
            logIn: false,
            error: ''
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
        .catch(error => error.message && this.setState({ error: error.message }))
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
        .catch(error => error.message && this.setState({ error: error.message }))
    }

    render () {
        return (
            <div id="loginContainer">
                
                {!this.state.logIn && !this.state.signUp && (
                    <div className="loginFormContainer">
                        <p onClick={() => this.setState({signUp: false, logIn: true})}>Log In</p>
                        <p onClick={() => this.setState({signUp: true, logIn: false})}>Sign Up</p>
                    </div>
                )}

                {this.state.logIn && !this.state.signUp && (
                    <div className="loginFormContainer">
                        <input name="email" type="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required></input>
                        <input name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required></input>
                        <p id="loginFormButton" onClick={this.handleLogin}>Log In</p>
                        <div id="loginBackButton" onClick={() => this.setState({signUp: false, logIn: false, error: ''})}><MdArrowBack /></div>
                    </div>
                )}

                {!this.state.logIn && this.state.signUp && (
                    <div className="loginFormContainer">
                        <input name="name" type="text" placeholder="Name" value={this.state.name} onChange={this.handleChange} required></input>
                        <input name="email" type="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required></input>
                        <input name="password" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required></input>
                        <p id="loginFormButton" onClick={this.handleSignUp}>Sign Up</p>
                        <div id="loginBackButton" onClick={() => this.setState({signUp: false, logIn: false, error: ''})}><MdArrowBack /></div>
                    </div>
                )}
                
                <div><p>{this.state.error && this.state.error}</p></div>
            </div>

        )
    }
}