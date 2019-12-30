import React from 'react'
import Header from './header'
import Nav from './nav'
import Map from './map'
import Login from './login'

export default class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoggedIn: false,
            userID: ''
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({isLoggedIn: true, userID: user.uid})
            } else {
                this.setState({isLoggedIn: false, userID: ''})
            }
        })
    }

    render() {
        return this.state.isLoggedIn
        ?
        <div id="main">
            <Header />
            <Map userID={this.state.userID} />
            <Nav />
        </div>
        :
        <div id="login">
            <Login />
        </div>
    }
}

