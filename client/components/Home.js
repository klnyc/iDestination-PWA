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
                            <div className="home-description-text">Keep track of your adventures and plan your next vacation.</div>
                            <div className="home-description-text">Easily view all the places that you've visited in the past</div>
                            <div className="home-description-text">and all the places you wish to visit in the future.</div>
                        </div>
                    </div>
                </div>
                <div className="home-information">
                    <div className="home-information-content">
                        <div className="home-information-text-container">
                            <div className="home-information-section card">
                                <div className="home-information-title">Features</div>
                                <div className="home-information-text">• Add locations as past experiences or to your wishlist</div>
                                <div className="home-information-text">• Add dates to each entry</div>
                                <div className="home-information-text">• Filter the map by categories</div>
                                <div className="home-information-text">• Set your home location</div>
                                <div className="home-information-text">• View all locations in a list</div>
                            </div>
                            <div className="home-information-section card">
                            <div className="home-information-title">Optimized for iPhone & Desktop</div>
                                <div className="home-information-text">• To add this app to your iPhone:</div>
                                <div className="home-information-text">• Visit idestination.web.app</div>
                                <div className="home-information-text">• Go to your browser options, settings, or preferences</div>
                                <div className="home-information-text">• Click "Add to Home Screen"</div>
                                <div className="home-information-text">• For any questions, please email klnyc6@gmail.com</div>
                            </div>
                        </div>
                        <div className="home-information-map"><img src="img/screenshot.png" className="card"></img></div>
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