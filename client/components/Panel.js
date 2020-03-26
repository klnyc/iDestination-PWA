import React from 'react'
import { connect } from 'react-redux'

class Panel extends React.Component {
    render() {
        const { markers, panel } = this.props
        return (
            <div className={panel ? "panel" : "invisible"}>
                <div className="panel-title">Experiences</div>
            </div>
        )
    }
}

const mapState = (state) => ({
    markers: state.markers,
    panel: state.panel
})

const mapDispatch = (dispatch) => ({
    
})

export default connect(mapState, null)(Panel)