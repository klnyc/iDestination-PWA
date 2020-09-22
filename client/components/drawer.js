import React from 'react'
import { connect } from 'react-redux'
import { toggleCategory, toggleHome, goToMarker, setCenter } from '../store'

class Drawer extends React.Component {
    constructor() {
        super()
        this.goHome = this.goHome.bind(this)
    }

    goHome() {
        const { goToMarker, setCenter, user } = this.props
        const NYC = { lat: 40.7473735256486, lng: -73.98564376909184 }
        user.home ? goToMarker(user.home) : setCenter(NYC)
    }

    render() {
        const { user, drawer, category, toggleCategory, home, toggleHome } = this.props
        return (
            <div className={drawer ? "drawer card" : "invisible"}>
                <div className="drawer-section first-section">
                    <div className="drawer-name">{user.name}</div>
                    <div className="drawer-email">{user.email}</div>
                </div>
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
                <div className="drawer-section">
                    <div className="drawer-title">Account</div>
                    <div className="drawer-link color-link" onClick={() => { toggleHome(home); this.goHome() }}>Home</div>
                    <div className="drawer-link color-link" onClick={() => firebase.auth().signOut()}>Sign Out</div>
                </div>
                <div className="drawer-copyright">© 2019 iDestination<br/>All Rights Reserved</div>
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