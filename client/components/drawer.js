import React from 'react'

const Drawer = ({ user, drawer }) => {
    return (
        <div className={drawer ? "drawer" : "drawer not-active"}>
            <div className="welcome">Welcome<br />{user.name}!</div>
        </div>
    )
}

export default Drawer