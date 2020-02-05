import React from 'react'
import { MdAddCircle } from 'react-icons/md'
import { IoMdPerson } from 'react-icons/io'

export default () => {
    return (
        <div id="header">
            <div className="headerIcon"><IoMdPerson /></div>
            <div id="headerTitle">iDestination</div>
            <div className="headerIcon" onClick={() => firebase.auth().signOut()}><MdAddCircle /></div>
        </div>
    )
}