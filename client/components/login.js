import React from 'react'
import { MdArrowBack } from 'react-icons/md'

class Login extends React.Component {
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
        const { logIn, signUp, email, password, name, error } = this.state
        return (
            <div className="login">

                {!logIn && !signUp && (
                    <div className="form">
                        <p className="label" onClick={() => this.setState({signUp: false, logIn: true})}>Log In</p>
                        <p className="label" onClick={() => this.setState({signUp: true, logIn: false})}>Sign Up</p>
                    </div>
                )}

                {logIn && !signUp && (
                    <div className="form">
                        <div className="input"><input name="email" type="email" placeholder="Email" value={email} onChange={this.handleChange} autoComplete="off" required></input></div>
                        <div className={password ? "input password" : "input"}><input name="password" type="password" placeholder="Password" value={password} onChange={this.handleChange} autoComplete="off" required></input></div>
                        <p className="button" onClick={this.handleLogin}>Log In</p>
                        <div className="back-button" onClick={() => this.setState({signUp: false, logIn: false, error: ''})}><MdArrowBack /></div>
                    </div>
                )}

                {!logIn && signUp && (
                    <div className="form">
                        <div className="input"><input name="name" type="text" placeholder="Name" value={name} onChange={this.handleChange} autoComplete="off" required></input></div>
                        <div className="input"><input name="email" type="email" placeholder="Email" value={email} onChange={this.handleChange} autoComplete="off" required></input></div>
                        <div className={password ? "input password" : "input"}><input name="password" type="password" placeholder="Password" value={password} onChange={this.handleChange} autoComplete="off" required></input></div>
                        <p className="button" onClick={this.handleSignUp}>Sign Up</p>
                        <div className="back-button" onClick={() => this.setState({signUp: false, logIn: false, error: ''})}><MdArrowBack /></div>
                    </div>
                )}
                
                <div><p className="error">{error}</p></div>
            </div>

        )
    }
}

export default Login