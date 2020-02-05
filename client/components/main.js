import React from 'react'
import { connect } from 'react-redux'
import Header from './header'
import Nav from './nav'
import Map from './map'
import Login from './login'
import { login, logout } from '../store'

class Main extends React.Component {
    componentDidMount() {
        const { login, logout } = this.props
        firebase.auth().onAuthStateChanged(user => user ? login(user) : logout())  
    }

    render() {
        const { isLoggedIn, userID } = this.props

        return isLoggedIn ?
        <div id="main">
            <Header />
            <Map userID={userID} />
            <Nav />
        </div>
        :
        <div id="login">
            <Header />
            <Login />
        </div>
    }
}

const mapState = (state) => ({
    isLoggedIn: state.isLoggedIn,
    userID: state.userID
})

const mapDispatch = (dispatch) => ({
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(Main)