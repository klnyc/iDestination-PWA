import React from 'react'
import { connect } from 'react-redux'
import { goToMarker, toggleOffPanels } from '../store'

class Panel extends React.Component {
    constructor() {
        super()
        this.renderMarkerDetails = this.renderMarkerDetails.bind(this)
    }

    renderMarkerDetails(marker, index) {
        const { goToMarker, toggleOffPanels } = this.props
        return (
            <div key={index} className="panel-line" onClick={() => {goToMarker(marker); toggleOffPanels()}}>
                <div className="panel-column name">{marker.name}</div>
                <div className="panel-column city">{marker.city}</div>
                <div className="panel-column date">12/20/20</div>
            </div>
        )
    }

    render() {
        const { panel, markers } = this.props
        const experiences = markers.filter(marker => marker.experiences)
        const wishlist = markers.filter(marker => marker.wishlist)
        const panelMarkers = panel.experiences ? experiences : wishlist
        return (
            <div className={(panel.experiences || panel.wishlist) ? "panel" : "invisible"}>
                <div className="panel-title">{panel.experiences ? "Experiences" : "Wishlist"}</div>
                <div>{panelMarkers.map((marker, index) => this.renderMarkerDetails(marker, index))}</div>
            </div>
        )
    }
}

const mapState = (state) => ({
    markers: state.markers,
    panel: state.panel
})

const mapDispatch = (dispatch) => ({
    goToMarker: (marker) => dispatch(goToMarker(marker)),
    toggleOffPanels: () => dispatch(toggleOffPanels())
})

export default connect(mapState, mapDispatch)(Panel)