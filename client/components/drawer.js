import React from 'react'

const Drawer = ({ user, drawer }) => {
    return (
        <div className={drawer ? "drawer" : "drawer not-active"}>
            <div className="welcome">{user.name}</div>
        </div>
    )
}

export default Drawer