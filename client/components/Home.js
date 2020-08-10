import React from 'react'
import { connect } from 'react-redux'
import { closeLogIn } from '../store'

class Home extends React.Component {
    render() {
        const { closeLogIn } = this.props
        return (
            <div className="home" onClick={() => closeLogIn()}>
                
            </div>
        )
    }
}

const mapDispatch = (dispatch) => ({
    closeLogIn: () => dispatch(closeLogIn())
})

export default connect(null, mapDispatch)(Home)

// iDestination is the Travel journal and travel planner, all in one.
// Easily view all the places that you've visited in the past 
// and all the places you wish to visit in the future.
// Keep track of your adventures and plan your next vacation.
