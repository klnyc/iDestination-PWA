import React from 'react'
import { connect } from 'react-redux'
import { closeLogIn } from '../store'

class Home extends React.Component {
    render() {
        const { closeLogIn } = this.props
        return (
            <div className="home" onClick={() => closeLogIn()}>
                <div className="home-description">
                    <div className="home-description-content">
                        <div className="home-description-title">Travel journal. Travel planner. All in one.</div>
                        <div className="home-description-text-container">
                            <div className="home-description-text">Easily view all the places that you've visited in the past</div>
                            <div className="home-description-text">and all the places you wish to visit in the future.</div>
                            <div className="home-description-text">Keep track of your adventures and plan your next vacation.</div>
                        </div>
                    </div>
                </div>
                <div className="home-information">
                    <div className="home-information-content">
                        <div className="home-information-text-container">
                            <div className="home-information-section card">
                                <div className="home-information-title">Features</div>
                                <div className="home-information-text">• Search for a location and choose to add it as a past experience or to your wishlist</div>
                                <div className="home-information-text">• Save your home location</div>
                                <div className="home-information-text">• Filter the map to show only your past experiences or your future destinations</div>
                            </div>
                            <div className="home-information-section card">
                            <div className="home-information-title">How to add the app to your phone</div>
                                <div className="home-information-text">• Search for a location and choose to add it as a past experience or to your wishlist</div>
                                <div className="home-information-text">• Save your home location</div>
                                <div className="home-information-text">• Filter the map to show only your past experiences or your future destinations</div>
                            </div>
                        </div>
                        <div className="home-information-map card"><img src="img/screenshot.png"></img></div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapDispatch = (dispatch) => ({
    closeLogIn: () => dispatch(closeLogIn())
})

export default connect(null, mapDispatch)(Home)