import React from 'react'
import { MdAddCircle } from 'react-icons/md'
import { IoMdPerson } from 'react-icons/io'

const Header = ({ user, toggleDrawer, drawer }) => {
    return (
        <div className={user.id ? "header" : "header not-active"}>
            <div className={user.id ? "header-icon" : "header-icon not-active"} onClick={() => toggleDrawer(drawer)}><IoMdPerson /></div>
            <div className="header-title">iDestination</div>
            <div className={user.id ? "header-icon" : "header-icon not-active"} onClick={() => firebase.auth().signOut()}><MdAddCircle /></div>
        </div>
    )
}

export default Header
