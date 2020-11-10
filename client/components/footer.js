import React from 'react'
import { connect } from 'react-redux'
import { MdStar } from 'react-icons/md'
import { GiFire } from "react-icons/gi"
import { togglePanelExperiences, togglePanelWishlist } from '../store'

class Footer extends React.Component {
    render() {
        const { user, panel, togglePanelExperiences, togglePanelWishlist } = this.props
        return (
            <div className={user.id ? "footer" : "invisible"}>
                <div className="footer-section">
                    <GiFire className="plain-link" onClick={() => togglePanelExperiences(panel.experiences)} />
                    <div className="footer-label">Experiences</div>
                </div>
                <div className="footer-section">
                    <MdStar className="plain-link" onClick={() => togglePanelWishlist(panel.wishlist)} />
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
    togglePanelExperiences: (panel) => dispatch(togglePanelExperiences(panel)),
    togglePanelWishlist: (panel) => dispatch(togglePanelWishlist(panel))
})

export default connect(mapState, mapDispatch)(Footer)