import React from 'react'
import { connect } from 'react-redux'
import { MdAddCircle } from 'react-icons/md'
import { IoMdPerson } from 'react-icons/io'
import { toggleDrawer } from '../store'

class Header extends React.Component {
    render() {
        const { user, toggleDrawer, drawer } = this.props
        return (
            <div className={user.id ? "header" : "header not-active"}>
                <div className={user.id ? "header-icon" : "header-icon not-active"} onClick={() => toggleDrawer(drawer)}><IoMdPerson /></div>
                <div className="header-title">iDestination</div>
                <div className={user.id ? "header-icon" : "header-icon not-active"}><MdAddCircle /></div>
            </div>
        )
    }
}

const mapState = (state) => ({
    user: state.user,
    drawer: state.drawer
})

const mapDispatch = (dispatch) => ({
    toggleDrawer: (drawer) => dispatch(toggleDrawer(drawer))
})

export default connect(mapState, mapDispatch)(Header)
