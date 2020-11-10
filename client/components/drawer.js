import React from 'react'
import { connect } from 'react-redux'
import { toggleCategory, toggleHome, goToMarker, setCenter } from '../store'
import { Header } from './Header'

class Drawer extends Header {
    render() {
        const { user, drawer, category, toggleCategory, home, toggleHome } = this.props
        return (
            <div className={drawer ? "drawer card" : "invisible"}>

                {/* Name Section */}
                <div className="drawer-section top">
                    <div className="drawer-name">{user.name}</div>
                    <div className="drawer-email">{user.email}</div>
                </div>

                {/* Display Section */}
                <div className="drawer-section">
                    <div className="drawer-title">Display</div>
                    <div className="drawer-link color-link" onClick={() => toggleCategory('all')}>
                        All{(category.experiences && category.wishlist) ? <span>●</span> : ''}
                    </div>
                    <div className="drawer-link color-link" onClick={() => toggleCategory('experiences')}>
                        Experiences{(category.experiences && !category.wishlist) ? <span>●</span> : ''}
                    </div>
                    <div className="drawer-link color-link" onClick={() => toggleCategory('wishlist')}>
                        Wishlist{(!category.experiences && category.wishlist) ? <span>●</span> : ''}
                    </div>
                </div>

                {/* Account Section */}
                <div className="drawer-section">
                    <div className="drawer-title">Account</div>
                    <div className="drawer-link color-link" onClick={() => { toggleHome(home); this.goHome() }}>Home</div>
                    <div className="drawer-link color-link" onClick={() => firebase.auth().signOut()}>Sign Out</div>
                </div>

                <div className="drawer-copyright">© 2020 iDestination<br/>All Rights Reserved</div>

            </div>
        )
    }
}

const mapState = (state) => ({
    user: state.user,
    drawer: state.drawer,
    category: state.category,
    home: state.home
})

const mapDispatch = (dispatch) => ({
    toggleCategory: (category) => dispatch(toggleCategory(category)),
    toggleHome: (home) => dispatch(toggleHome(home)),
    goToMarker: (marker) => dispatch(goToMarker(marker)),
    setCenter: (coordinates) => dispatch(setCenter(coordinates)),
})

export default connect(mapState, mapDispatch)(Drawer)