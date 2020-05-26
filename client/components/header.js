import React from 'react'
import { connect } from 'react-redux'
import { IoMdPerson, IoMdHome } from 'react-icons/io'
import { toggleDrawer, goToMarker, setCenter } from '../store'

class Header extends React.Component {
    constructor() {
        super()
        this.goHome = this.goHome.bind(this)
    }

    goHome() {
        const { goToMarker, setCenter, user } = this.props
        const NYC = { lat: 40.7473735256486, lng: -73.98564376909184 }
        user.home ? goToMarker(user.home) : setCenter(NYC)
    }

    render() {
        const { user, toggleDrawer, drawer } = this.props
        return (
            <div className={user.id ? "header" : "header header-login"}>
                <div className={user.id ? "header-icon" : "invisible"}><IoMdPerson className="plain-link" onClick={() => toggleDrawer(drawer)} /></div>
                <div className="header-title">iDestination</div>
                <div className={user.id ? "header-icon" : "invisible"}><IoMdHome className="plain-link" onClick={this.goHome} /></div>
            </div>
        )
    }
}

const mapState = (state) => ({
    user: state.user,
    drawer: state.drawer
})

const mapDispatch = (dispatch) => ({
    toggleDrawer: (drawer) => dispatch(toggleDrawer(drawer)),
    goToMarker: (marker) => dispatch(goToMarker(marker)),
    setCenter: (coordinates) => dispatch(setCenter(coordinates))
})

export default connect(mapState, mapDispatch)(Header)
