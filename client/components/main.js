import React from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import Footer from './Footer'
import Map from './Map'
import Home from './Home'
import Drawer from './Drawer'
import Panel from './Panel'
import { login, logout } from '../store'

class Main extends React.Component {
    componentDidMount() {
        const { login, logout } = this.props
        firebase.auth().onAuthStateChanged(user => user ? login(user): logout())
    }

    render() {
        const { user } = this.props
        return (
            <div id="main">
                <Header />
                {user.id ? <Map /> : <Home />}
                <Drawer />
                <Panel />
                <Footer />
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