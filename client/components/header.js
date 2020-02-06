import React from 'react'
import { MdAddCircle } from 'react-icons/md'
import { IoMdPerson } from 'react-icons/io'

const Header = ({ userID }) => {
    return (
        <div className={userID ? "header" : "header not-active"}>
            <div className="icon"><IoMdPerson /></div>
            <div className="title">iDestination</div>
            <div className="icon" onClick={() => firebase.auth().signOut()}><MdAddCircle /></div>
        </div>
    )
}

export default Header
