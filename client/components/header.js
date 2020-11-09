import React from 'react'
import { connect } from 'react-redux'
import { IoMdPerson, IoMdHome } from 'react-icons/io'
import { toggleDrawer, goToMarker, setCenter, openLogIn } from '../store'
import Login from './Login'

class Header extends React.Component {
    constructor() {
        super()
        this.goHome = this.goHome.bind(this)
        this.renderHomeHeader = this.renderHomeHeader.bind(this)
        this.renderMapHeader = this.renderMapHeader.bind(this)
    }

    goHome() {
        const { goToMarker, setCenter, user } = this.props
        const NYC = { lat: 40.7473735256486, lng: -73.98564376909184 }
        user.home ? goToMarker(user.home) : setCenter(NYC)
    }

    renderHomeHeader() {
        const { login, openLogIn } = this.props
        return (
            <div className="header header-home">
                <div className="header-icon">
                    <div className="header-logo">
                        <img src="img/logo.png" width="40" height="40" />
                        <span className="logo-title">iDestination</span>
                    </div>
                </div>
                <div className="header-title">iDestination</div>
                <div className="header-icon"><div className="header-login-link" onClick={() => openLogIn()}>Login</div></div>
                {login && <Login />}
            </div>
        )
    }

    renderMapHeader() {
        const { toggleDrawer, drawer } = this.props
        return (
            <div className="header header-map">
                <div className="header-icon"><IoMdPerson className="plain-link" onClick={() => toggleDrawer(drawer)} /></div>
                <div className="header-title">iDestination</div>
                <div className="header-icon"><IoMdHome className="plain-link" onClick={this.goHome} /></div>
            </div>
        )
    }

    render() {
        const { user } = this.props
        return user.id ? this.renderMapHeader() : this.renderHomeHeader()
    }
}

const mapState = (state) => ({
    user: state.user,
    drawer: state.drawer,
    login: state.login
})

const mapDispatch = (dispatch) => ({
    toggleDrawer: (drawer) => dispatch(toggleDrawer(drawer)),
    goToMarker: (marker) => dispatch(goToMarker(marker)),
    setCenter: (coordinates) => dispatch(setCenter(coordinates)),
    openLogIn: () => dispatch(openLogIn())
})

export default connect(mapState, mapDispatch)(Header)
export { Header }
