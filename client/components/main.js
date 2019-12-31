import React from 'react'
import { connect } from 'react-redux'
import Header from './header'
import Nav from './nav'
import Map from './map'
import Login from './login'
import { login, logout } from '../store'

class Main extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => user ? this.props.login(user) : this.props.logout())  
    }

    render() {
        return this.props.isLoggedIn
        ?
        <div id="main">
            <Header />
            <Map userID={this.props.userID} />
            <Nav />
        </div>
        :
        <div id="login">
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