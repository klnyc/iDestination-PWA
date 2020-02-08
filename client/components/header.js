import React from 'react'
import { MdAddCircle } from 'react-icons/md'
import { IoMdPerson } from 'react-icons/io'

const Header = ({ user }) => {
    return (
        <div className={user.id ? "header" : "header not-active"}>
            <div className={user.id ? "icon" : "icon not-active"}><IoMdPerson /></div>
            <div className="title">iDestination</div>
            <div className={user.id ? "icon" : "icon not-active"} onClick={() => firebase.auth().signOut()}><MdAddCircle /></div>
        </div>
    )
}

export default Header
