import React from 'react'
import { connect } from 'react-redux'
import Header from './header'
import Footer from './footer'
import Map from './map'
import Login from './login'
import { login, logout } from '../store'

class Main extends React.Component {
    componentDidMount() {
        const { login, logout } = this.props
        firebase.auth().onAuthStateChanged(user => user ? login(user) : logout())  
    }

    render() {
        const { userID } = this.props
        return (
            <div id="main">
                <Header userID={userID}/>
                {userID ? <Map /> : <Login />}
                <Footer />
            </div>
        )
    }
}

const mapState = (state) => ({
    userID: state.userID
})

const mapDispatch = (dispatch) => ({
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(Main)