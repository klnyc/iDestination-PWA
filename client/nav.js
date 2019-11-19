import React from 'react'
import { MdStar } from 'react-icons/md'
import { GiFire } from "react-icons/gi"

export default () => {
    return (
        <div id="nav">
            <div id="navIcon"><GiFire /><div id="navText">Experiences</div></div>
            <div id="navIcon"><MdStar /><div id="navText">Wishlist</div></div>
        </div>
    )
}