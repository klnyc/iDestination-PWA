import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import Footer from './Footer'
import Map from './Map'
import Login from './Login'
import Drawer from './Drawer'
import { login, logout, toggleDrawer } from '../store'

class Main extends React.Component {
    componentDidMount() {
        const { login, logout } = this.props
        firebase.auth().onAuthStateChanged(user => user ? login(user): logout())
    }

    render() {
        const { user } = this.props
        return (
            <div id="main">
                <Drawer />
                <Header />
                {user.id ? <Map /> : <Login />}
                <Footer user={user} />
            </div>
        )
    }
}

const mapState = (state) => ({
    user: state.user
})

const mapDispatch = (dispatch) => ({
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(Main)