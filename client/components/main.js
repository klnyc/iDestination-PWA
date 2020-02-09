import React from 'react'
import { connect } from 'react-redux'
import Header from './header'
import Footer from './footer'
import Map from './map'
import Login from './login'
import Drawer from './drawer'
import { login, logout, toggleDrawer } from '../store'

class Main extends React.Component {
    componentDidMount() {
        const { login, logout } = this.props
        firebase.auth().onAuthStateChanged(user => user ? login(user): logout())
    }

    render() {
        const { user, toggleDrawer, drawer } = this.props
        return (
            <div id="main">
                <Drawer user={user} drawer={drawer} />
                <Header user={user} toggleDrawer={toggleDrawer} drawer={drawer} />
                {user.id ? <Map /> : <Login />}
                <Footer user={user} />
            </div>
        )
    }
}

const mapState = (state) => ({
    user: state.user,
    drawer: state.drawer
})

const mapDispatch = (dispatch) => ({
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout()),
    toggleDrawer: (drawer) => dispatch(toggleDrawer(drawer))
})

export default connect(mapState, mapDispatch)(Main)