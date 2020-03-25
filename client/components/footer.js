import React from 'react'
import { MdStar } from 'react-icons/md'
import { GiFire } from "react-icons/gi"

const Footer = ({ user }) => {
    return (
        <div className={user.id ? "footer" : "footer not-active"}>
            <div className="footer-icon"><GiFire /><div className="footer-label">Experiences</div></div>
            <div className="footer-icon"><MdStar /><div className="footer-label">Wishlist</div></div>
        </div>
    )
}

export default Footer