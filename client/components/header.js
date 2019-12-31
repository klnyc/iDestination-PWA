import React from 'react'
import { MdAddCircle } from 'react-icons/md'
import { IoMdPerson } from 'react-icons/io'
import store, { clearSearchBox } from '../store'

export default () => {
    return (
        <div id="header">
            <div className="headerIcon" onClick={() => firebase.auth().signOut()}><IoMdPerson /></div>
            <div id="title">iDestination</div>
            <div className="headerIcon" onClick={() => store.dispatch(clearSearchBox())}><MdAddCircle /></div>
        </div>
    )
}