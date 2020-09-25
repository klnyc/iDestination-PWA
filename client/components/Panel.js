import React from 'react'
import { connect } from 'react-redux'
import { goToMarker, toggleOffFeatures } from '../store'

class Panel extends React.Component {
    constructor() {
        super()
        this.renderMarkerDetails = this.renderMarkerDetails.bind(this)
        this.sortMarkers = this.sortMarkers.bind(this)
    }

    renderMarkerDetails(marker, index) {
        const { goToMarker, toggleOffFeatures, panel } = this.props
        return (
            <div key={index} className={"panel-line " + (panel.experiences ? "experiences" : "wishlist")}>
                <div className="panel-column name color-link" onClick={() => { goToMarker(marker); toggleOffFeatures() }}>{marker.name}</div>
                <div className="panel-column city">{marker.city}</div>
                <div className="panel-column date">{marker.date}</div>
            </div>
        )
    }

    sortMarkers(markers) {
        return markers.sort((a, b) => {
            const formatDate = (date) => date ? `${date.slice(6)}${date.slice(0, 2)}${date.slice(3, 5)}` : ''
            return formatDate(b.date) - formatDate(a.date)
        })
    }

    render() {
        const { panel, markers } = this.props
        const experiences = markers.filter(marker => marker.experiences)
        const wishlist = markers.filter(marker => marker.wishlist)
        const panelMarkers = panel.experiences ? experiences : wishlist
        return (
            <div className={(panel.experiences || panel.wishlist) ? "panel card" : "invisible"}>
                <div className="panel-title">{panel.experiences ? "Experiences" : "Wishlist"}</div>
                {this.sortMarkers(panelMarkers).map((marker, index) => this.renderMarkerDetails(marker, index))}
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
    toggleOffFeatures: () => dispatch(toggleOffFeatures())
})

export default connect(mapState, mapDispatch)(Panel)