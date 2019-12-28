import React from 'react'
import { MdAddCircle } from 'react-icons/md'
import { IoMdPerson } from 'react-icons/io'

export default () => {
    return (
        <div id="header">
            <div className="headerIcon" onClick={() => firebase.auth().signOut()}><IoMdPerson /></div>
            <div id="title">iDestination</div>
            <div className="headerIcon"><MdAddCircle /></div>
        </div>
    )
}