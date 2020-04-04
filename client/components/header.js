import React from 'react'
import { connect } from 'react-redux'
import { IoMdPerson, IoMdHome } from 'react-icons/io'
import { toggleDrawer, goToMarker } from '../store'

class Header extends React.Component {
    render() {
        const { user, toggleDrawer, drawer, goToMarker } = this.props
        return (
            <div className={user.id ? "header" : "header header-login"}>
                <div className={user.id ? "header-icon" : "invisible"}><IoMdPerson className="link" onClick={() => toggleDrawer(drawer)} /></div>
                <div className="header-title">iDestination</div>
                <div className={user.id ? "header-icon" : "invisible"}><IoMdHome className="link" onClick={() => goToMarker(user.home)} /></div>
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
    goToMarker: (marker) => dispatch(goToMarker(marker))
})

export default connect(mapState, mapDispatch)(Header)
