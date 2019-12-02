import React from 'react'
import Header from './header'
import Nav from './nav'
import Map from './map'
import Login from './login'

export default class Main extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoggedIn: false
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({isLoggedIn: true})
            } else {
                this.setState({isLoggedIn: false})
            }
        })
    }

    render() {
        return (
            <div id="main">
                <Header />
                {this.state.isLoggedIn ? <Map /> : <Login />}
                <Nav />
            </div>
        )
    }
}

