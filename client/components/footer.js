import React from 'react'
import { connect } from 'react-redux'
import { MdStar } from 'react-icons/md'
import { GiFire } from "react-icons/gi"
import { togglePanel } from '../store'

class Footer extends React.Component {
    render() {
        const { user, panel, togglePanel } = this.props
        return (
            <div className={user.id ? "footer" : "invisible"}>
                <div className="footer-icon">
                    <GiFire onClick={() => togglePanel(panel)} />
                    <div className="footer-label">Experiences</div>
                </div>
                <div className="footer-icon">
                    <MdStar onClick={() => togglePanel(panel)} />
                    <div className="footer-label">Wishlist</div>
                </div>
            </div>
        )
    }
}

const mapState = (state) => ({
    user: state.user,
    panel: state.panel
})

const mapDispatch = (dispatch) => ({
    togglePanel: (panel) => dispatch(togglePanel(panel))
})

export default connect(mapState, mapDispatch)(Footer)