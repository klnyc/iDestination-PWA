import React, { Fragment}  from 'react'
import { connect } from 'react-redux'
import { Marker } from "react-google-maps"
import { openInfoWindow } from '../store'

class Markers extends React.Component {
    render() {
        const { markers, openInfoWindow, currentMarker } = this.props
        return (
            <Fragment>
                {markers.map((marker, index) => {
                    return marker.wishlist
                    ? <Marker
                        key={index}
                        position={marker.position}
                        onClick={() => openInfoWindow(marker)} />
                    : <Marker
                        key={index}
                        position={marker.position}
                        onClick={() => openInfoWindow(marker)} 
                        icon={{url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}} />
                    }
                )}

                {currentMarker.position && (
                    <Marker 
                    position={currentMarker.position} 
                    onClick={() => openInfoWindow(currentMarker)} />
                )}
            </Fragment>
        )
    }
}

const mapState = (state) => ({
    markers: state.markers,
    currentMarker: state.currentMarker
})

const mapDispatch = (dispatch) => ({
    openInfoWindow: (marker) => dispatch(openInfoWindow(marker))
})

export default connect(mapState, mapDispatch)(Markers)