import React from 'react'
import { MdStar } from 'react-icons/md'
import { GiFire } from "react-icons/gi"

const Footer = () => {
    return (
        <div className="footer">
            <div className="icon"><GiFire /><div className="label">Experiences</div></div>
            <div className="icon"><MdStar /><div className="label">Wishlist</div></div>
        </div>
    )
}

export default Footer