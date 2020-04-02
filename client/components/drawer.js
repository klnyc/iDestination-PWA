import React from 'react'
import { connect } from 'react-redux'
import { toggleCategory } from '../store'

class Drawer extends React.Component {
    render() {
        const { user, drawer, category, toggleCategory } = this.props
        return (
            <div className={drawer ? "drawer" : "invisible"}>
                <div className="drawer-name">{user.name}</div>
                <div className="drawer-email">{user.email}</div>
                <div className="drawer-link">Display</div>
                <div className="drawer-minor" onClick={() => toggleCategory('all')}>
                    All{(category.experiences && category.wishlist) ? <span>●</span> : ''}
                </div>
                <div className="drawer-minor" onClick={() => toggleCategory('experiences')}>
                    Experiences{(category.experiences && !category.wishlist) ? <span>●</span> : ''}
                </div>
                <div className="drawer-minor" onClick={() => toggleCategory('wishlist')}>
                    Wishlist{(!category.experiences && category.wishlist) ? <span>●</span> : ''}
                </div>
                <div className="drawer-link">Home</div>
                <div className="drawer-minor">Edit</div>
                <div className="drawer-link" onClick={() => firebase.auth().signOut()}>Sign Out</div>
                <div className="drawer-copyright">© 2019 iDestination<br/>All Rights Reserved.</div>
            </div>
        )
    }
}

const mapState = (state) => ({
    user: state.user,
    drawer: state.drawer,
    category: state.category
})

const mapDispatch = (dispatch) => ({
    toggleCategory: (category) => dispatch(toggleCategory(category))
})

export default connect(mapState, mapDispatch)(Drawer)