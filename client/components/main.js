import React from 'react'
import { connect } from 'react-redux'
import store from '../store'
import Header from './header'
import Nav from './nav'
import Map from './map'
import Login from './login'
import { loginAction, logoutAction } from '../reducers/loginReducer'

class Main extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                store.dispatch(loginAction(user))
            } else {
                store.dispatch(logoutAction())
            }
        })  
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

const mapState = state => {
    return {
        isLoggedIn: state.login.isLoggedIn,
        userID: state.login.userID
    }
}

export default connect(mapState)(Main)