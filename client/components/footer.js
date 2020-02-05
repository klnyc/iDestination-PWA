import React from 'react'
import { MdStar } from 'react-icons/md'
import { GiFire } from "react-icons/gi"

export default () => {
    return (
        <div id="footer">
            <div className="footerIcon"><GiFire /><div className="footerText">Experiences</div></div>
            <div className="footerIcon"><MdStar /><div className="footerText">Wishlist</div></div>
        </div>
    )
}