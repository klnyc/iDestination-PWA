import React from 'react'
import { MdStar } from 'react-icons/md'
import { GiFire } from "react-icons/gi"

const Footer = ({ user }) => {
    return (
        <div className={user.id ? "footer" : "footer not-active"}>
            <div className="icon"><GiFire /><div className="label">Experiences</div></div>
            <div className="icon"><MdStar /><div className="label">Wishlist</div></div>
        </div>
    )
}

export default Footer