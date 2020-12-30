import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import Footer from './Footer'
import Map from './Map'
import Home from './Home'
import Drawer from './Drawer'
import List from './List'
import Weather from './Weather'
import { login, logout } from '../store'

class Main extends React.Component {
    constructor() {
        super()
        this.renderApp = this.renderApp.bind(this)
        this.renderHomePage = this.renderHomePage.bind(this)
    }

    componentDidMount() {
        const { login, logout } = this.props
        firebase.auth().onAuthStateChanged(user => user ? login(user): logout())
    }

    renderApp() {
        const { drawer, list, weather } = this.props
        return (
            <Fragment>
                <Map />
                {drawer && <Drawer />}
                {(list.experiences || list.wishlist) && <List />}
                {weather && <Weather />}
                <Footer />
            </Fragment>
        )
    }

    renderHomePage() {
        return <Home />
    }

    render() {
        const { user } = this.props
        return (
            <div id="main">
                <Header />
                {user.id ? this.renderApp() : this.renderHomePage()}
            </div>
        )
    }
}

const mapState = (state) => ({
    user: state.user,
    drawer: state.drawer,
    list: state.list,
    weather: state.weather
})

const mapDispatch = (dispatch) => ({
    login: (user) => dispatch(login(user)),
    logout: () => dispatch(logout())
})

export default connect(mapState, mapDispatch)(Main)