import React from 'react'
import { connect } from 'react-redux'

class Drawer extends React.Component {
    render() {
        const { user, drawer } = this.props
        return (
            <div className={drawer ? "drawer" : "drawer not-active"}>
                <div className="drawer-name">{user.name}</div>
                <div className="drawer-email">{user.email}</div>
                <div className="drawer-link" onClick={() => firebase.auth().signOut()}>Sign Out</div>
            </div>
        )
    }
}

const mapState = (state) => ({
    user: state.user,
    drawer: state.drawer
})

export default connect(mapState, null)(Drawer)