import React, { Fragment}  from 'react'
import { connect } from 'react-redux'
import { Marker } from "react-google-maps"
import { openInfoWindow } from '../store'

class Markers extends React.Component {
    constructor() {
        super()
        this.state = {
            experiences: { color: 'lightsteelblue' },
            wishlist: { color: 'palevioletred'}
        }
        this.renderMarker = this.renderMarker.bind(this)
    }

    renderMarker(marker, index, category) {
        const { openInfoWindow } = this.props
        return (
            <Marker
                key={index}
                position={marker.position}
                onClick={() => openInfoWindow(marker)} 
                label={{ text: '●', color: 'black' }}
                icon={{
                    path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
                    fillColor: category.color,
                    fillOpacity: 1,
                    strokeColor: 'black',
                    strokeWeight: 1,
                    labelOrigin: { x: 0.48, y: -30 }
                }} />
        )
    }

    render() {
        const { markers, currentMarker } = this.props
        return (
            <Fragment>
                {markers.map((marker, index) => marker.experiences
                    ? this.renderMarker(marker, index, this.state.experiences)
                    : this.renderMarker(marker, index, this.state.wishlist)
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