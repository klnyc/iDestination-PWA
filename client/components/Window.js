import React from 'react'
import { connect } from 'react-redux'
import { InfoWindow } from "react-google-maps"
import { FaTrash } from "react-icons/fa"
import { MdStar } from 'react-icons/md'
import { GiFire } from 'react-icons/gi'
import { addMarker, removeMarker, closeInfoWindow } from '../store'

class Window extends React.Component {
    constructor() {
        super()
        this.renderInfoWindowFooter = this.renderInfoWindowFooter.bind(this)
    }

    renderInfoWindowFooter() {
        const { user, infoWindow, removeMarker } = this.props
        let categoryIcons
        if (infoWindow.experiences && infoWindow.wishlist) {categoryIcons = <div><GiFire /><MdStar /></div>}
        else if (infoWindow.experiences) {categoryIcons = <div><GiFire /></div>}
        else if (infoWindow.wishlist) {categoryIcons = <div><MdStar /></div>}
        return (
          <div className="infoWindow-footer">
            {categoryIcons}
            <div className="infoWindow-icon-trash" onClick={() => removeMarker(user.id, infoWindow)}><FaTrash /></div>
          </div>
        )
    }

    render() {
        const { infoWindow, user, currentMarker, markers, closeInfoWindow, addMarker } = this.props
        return (
            <InfoWindow position={infoWindow.position} onCloseClick={() => closeInfoWindow()}>
                <div className="infoWindow">
                    <div className="infoWindow-name">{infoWindow.name}</div>
                    <div className="infoWindow-address">{infoWindow.address}</div>

                    {markers.indexOf(infoWindow) === -1 &&
                    <div>
                        <div className="infoWindow-add" onClick={() => addMarker(user.id, currentMarker, 'experiences')}>Add Experience</div>
                        <div className="infoWindow-add" onClick={() => addMarker(user.id, currentMarker, 'wishlist')}>Add Wish</div>
                    </div>}

                    {markers.includes(infoWindow) && this.renderInfoWindowFooter()}

                </div>
            </InfoWindow>
        )
    }
}

const mapState = (state) => ({
    user: state.user,
    markers: state.markers,
    currentMarker: state.currentMarker,
    infoWindow: state.infoWindow
})

const mapDispatch = (dispatch) => ({
    addMarker: (id, marker, category) => dispatch(addMarker(id, marker, category)),
    removeMarker: (id, marker) => dispatch(removeMarker(id, marker)),
    closeInfoWindow: () => dispatch(closeInfoWindow())
})

export default connect(mapState, mapDispatch)(Window)