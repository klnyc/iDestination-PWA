import React from 'react'
import { MdAddCircle } from 'react-icons/md'
import { IoMdPerson } from 'react-icons/io'

export default () => {
    return (
        <div id="header">
            <div id="headerIcon"><IoMdPerson /></div>
            <div id="title">iDestination</div>
            <div id="headerIcon"><MdAddCircle /></div>
        </div>
    )
}