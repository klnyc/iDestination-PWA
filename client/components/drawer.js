import React from 'react'
import { connect } from 'react-redux'
import { toggleCategory, toggleHome } from '../store'

class Drawer extends React.Component {
    render() {
        const { user, drawer, category, toggleCategory, home, toggleHome } = this.props
        return (
            <div className={drawer ? "drawer" : "invisible"}>
                
                <div className="drawer-section">
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
                    <div className="drawer-title">Home</div>
                    <div className="drawer-link color-link" onClick={() => toggleHome(home)}>Edit</div>
                </div>

                <div className="drawer-section signout">
                    <div className="drawer-title color-link" onClick={() => firebase.auth().signOut()}>Sign Out</div>
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
    toggleHome: (home) => dispatch(toggleHome(home))
})

export default connect(mapState, mapDispatch)(Drawer)