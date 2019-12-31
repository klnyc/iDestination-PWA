import React from 'react'
import { MdStar } from 'react-icons/md'
import { GiFire } from "react-icons/gi"

export default () => {
    return (
        <div id="nav">
            <div className="navIcon"><GiFire /><div className="navText">Experiences</div></div>
            <div className="navIcon"><MdStar /><div className="navText">Wishlist</div></div>
        </div>
    )
}