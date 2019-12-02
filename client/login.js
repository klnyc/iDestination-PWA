import React from 'react'

export default class Login extends React.Component {
    constructor() {
        super()
        this.state ={
            email: '',
            password: '',
            name: '',
            signUp: false,
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.handleSignUp = this.handleSignUp.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                console.log('Logged in!')
            } else {
                console.log('Logged out!')
            }
        })
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

    handleLogout(event) {
        event.preventDefault()
        firebase.auth().signOut()
    }

    render () {
        return (
            <div>
                {this.state.signUp
                ?
                <div>
                    <p>iDestination SIGN UP PAGE</p>
                    <form onSubmit={this.handleSignUp}>
                        <label htmlFor="name">Name</label>
                        <input name="name" type="text" value={this.state.name} onChange={this.handleChange} required></input>
                        <label htmlFor="email">Email</label>
                        <input name="email" type="email" value={this.state.email} onChange={this.handleChange} required></input>
                        <label htmlFor="password">Password</label>
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} required></input>
                        <button onClick={() => this.setState({signUp: false})}>Log In</button>
                        <button type="submit">Sign Up</button>
                    </form>
                </div>
                :
                <div>
                    <p>iDestination LOGIN PAGE</p>
                    <form onSubmit={this.handleLogin}>
                        <label htmlFor="email">Email</label>
                        <input name="email" type="email" value={this.state.email} onChange={this.handleChange} required></input>
                        <label htmlFor="password">Password</label>
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange} required></input>
                        <button type="submit">Log In</button>
                        <button onClick={() => this.setState({signUp: true})}>Sign Up</button>
                    </form>
                </div>}
                <div><p onClick={this.handleLogout}>LOGOUT</p></div>
            </div>
        )
    }
}