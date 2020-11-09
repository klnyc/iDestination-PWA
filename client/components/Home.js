import React from 'react'
import { connect } from 'react-redux'
import { closeLogIn } from '../store'

class Home extends React.Component {
    render() {
        const { closeLogIn } = this.props
        return (
            <div className="home" onClick={() => closeLogIn()}>

                {/* Description Page */}
                <div className="home-description">
                    <div className="home-description-content">
                        <div className="home-description-slogan">
                            <span>Travel journal.</span><span>Travel planner.</span><span>All in one.</span>
                        </div>
                        <div className="home-description-text-container">
                            <div className="home-description-text">Keep track of your adventures.</div>
                            <div className="home-description-text">Plan your next vacation.</div>
                        </div>
                        <div className="home-description-map"><img src="img/screenshot.png" className="card"></img></div>
                    </div>
                </div>

                {/* Information Page */}
                <div className="home-information">
                    <div className="home-information-content">
                        <div className="home-information-row top">
                            <div className="home-information-section card">
                                <div className="home-information-title">About</div>
                                <div className="home-information-text">• Create your perfect intinerary!</div>
                                <div className="home-information-text">• Ever wanted a travel to-do list? How about a travel to-go list?</div>
                                <div className="home-information-text">• Save places that you want to visit to easily view them on a map</div>
                                <div className="home-information-text">• See how close they are to one another so you can plan accordingly!</div>
                                <div className="home-information-text">• Look back at all the past places that you've visited already</div>
                            </div>
                            <div className="home-information-section card">
                            <div className="home-information-title">Features</div>
                                <div className="home-information-text">• Optimized for iPhone and desktop</div>
                                <div className="home-information-text">• Login or sign up with your email</div>
                                <div className="home-information-text">• Search and add locations as past experiences or to your wishlist</div>
                                <div className="home-information-text">• Delete logged locations</div>
                                <div className="home-information-text">• Add dates to each entry</div>
                                <div className="home-information-text">• Filter the map by categories</div>
                                <div className="home-information-text">• Set your home location</div>
                                <div className="home-information-text">• View lists of all logged locations' names, cities and dates</div>
                            </div>
                        </div>
                        <div className="home-information-row bottom">
                            <div className="home-information-section card">
                                <div className="home-information-title">Add To Your iPhone</div>
                                <div className="home-information-text">• Open Safari</div>
                                <div className="home-information-text">• Visit idestination.web.app</div>
                                <div className="home-information-text">• Go to your browser options, settings, or preferences</div>
                                <div className="home-information-text">• Click "Add to Home Screen"</div>
                                <div className="home-information-text">• Open iDestination from your home screen</div>
                            </div>
                            <div className="home-information-section card">
                                <div className="home-information-title">Contact</div>
                                <div className="home-information-text">• For any questions, please email klnyc6@gmail.com</div>
                                <div className="home-information-text">• © 2019 iDestination. All rights reserved</div>
                            </div>
                        </div>
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

// Track all the places you've visited in the past. Visually reminisce your travel history on a map.
// Track all the places you wish to visit in the future. See how close they are to one another so you can plan accordingly.

// Search and add location markers as a past experience or as a wish.
// FIlter your marked locations by categories.
// Set your default home location.