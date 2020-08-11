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
                        <div className="home-description-text">
                            <div className="home-text">Easily view all the places that you've visited in the past</div>
                            <div className="home-text">and all the places you wish to visit in the future.</div>
                            <div className="home-text">Keep track of your adventures and plan your next vacation.</div>
                        </div>
                    </div>
                </div>
                <div className="home-information">
                    <div className="home-information-content">
                        <div className="home-information-text">
                            <div className="home-information-functionality card"></div>
                            <div className="home-information-instruction card"></div>
                        </div>
                        <div className="home-information-map card">

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