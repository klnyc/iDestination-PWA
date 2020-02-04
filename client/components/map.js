import React from 'react'
import { connect } from 'react-redux'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox"
import { compose, withProps } from 'recompose'
import { GOOGLE_MAPS_API_KEY } from '../../secrets'
import * as actions from '../store'
import { IoMdCloseCircle } from 'react-icons/io'
import { FaTrash } from "react-icons/fa"

class Map extends React.Component {
  componentDidMount() {
    this.props.renderMarkers(this.props.userID)
  }

  render() {
    const { 
      mountMap, center, changeBounds, map, mountSearchBox, bounds, changePlace, 
      searchBox, searchInput, handleChange, clearSearchBox, markers, openInfoWindow, 
      currentMarker, infoWindow, closeInfoWindow, userID, addMarker, removeMarker } = this.props

    return (
      <GoogleMap
        ref={(map) => mountMap(map)}
        center={center}
        onBoundsChanged={() => changeBounds(map.getBounds())}
        defaultZoom={13}
        defaultOptions={mapSettings}>

        <SearchBox
          ref={(searchBox) => mountSearchBox(searchBox)}
          bounds={bounds}
          controlPosition={google.maps.ControlPosition.TOP_CENTER}
          onPlacesChanged={() => changePlace(searchBox.getPlaces()[0])}>
          <div id="searchBoxContainer">
            <input
              id="searchBox"
              name="searchInput"
              type="text"
              placeholder="Enter Destination"
              value={searchInput}
              onChange={(event) => handleChange(event)} />
            <div
              className={searchInput ? "clearSearchBox clearActive" : "clearSearchBox"}
              onClick={clearSearchBox}>
              <IoMdCloseCircle />
            </div>
          </div>
        </SearchBox>
        
        {markers.map((marker, index) =>
          <Marker 
            key={index}
            position={marker.position}
            onClick={() => openInfoWindow(marker)} />
        )}

        {currentMarker.position && (
          <Marker 
            position={currentMarker.position} 
            onClick={() => openInfoWindow(currentMarker)} />
        )}

        {infoWindow.position && (
          <InfoWindow
            position={infoWindow.position}
            onCloseClick={() => closeInfoWindow()}>
            <div className="infoWindow">
              <p className="infoWindowName">{infoWindow.name}</p>
              <p>{infoWindow.address}</p>

              {markers.indexOf(infoWindow) === -1 &&
              <p onClick={() => addMarker(userID, currentMarker)}>ADD THIS PLACE</p>}

              {markers.includes(infoWindow) && 
              <div className="trashIcon" onClick={() => removeMarker(userID, infoWindow)}><FaTrash /></div>}

            </div>
          </InfoWindow>
        )}

      </GoogleMap>
    )
  }
}

const mapSettings = {
  disableDefaultUI: true,
  clickableIcons: false
}

const mapProperties = {
  googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div id="map" />,
  mapElement: <div style={{ height: `100%` }} />
}

const mapState = (state) => ({
  userID: state.userID,
  center: state.center,
  bounds: state.bounds,
  map: state.map,
  searchBox: state.searchBox,
  searchInput: state.searchInput,
  markers: state.markers,
  currentMarker: state.currentMarker,
  infoWindow: state.infoWindow
})

const mapDispatch = (dispatch) => ({
  mountMarkers: (markers) => dispatch(actions.mountMarkers(markers)),
  mountMap: (map) => dispatch(actions.mountMap(map)),
  mountSearchBox: (searchBox) => dispatch(actions.mountSearchBox(searchBox)),
  changeBounds: (bounds) => dispatch(actions.changeBounds(bounds)),
  changePlace: (place) => dispatch(actions.changePlace(place)),
  openInfoWindow: (marker) => dispatch(actions.openInfoWindow(marker)),
  closeInfoWindow: () => dispatch(actions.closeInfoWindow()),
  handleChange: (event) => dispatch(actions.handleChange(event)),
  clearSearchBox: () => dispatch(actions.clearSearchBox()),
  clearCurrentMarker: () => dispatch(actions.clearCurrentMarker()),
  renderMarkers: (userID) => dispatch(actions.renderMarkers(userID)),
  addMarker: (userID, marker) => dispatch(actions.addMarker(userID, marker)),
  removeMarker: (userID, marker) => dispatch(actions.removeMarker(userID, marker))
})

export default connect(mapState, mapDispatch)(compose(withProps(mapProperties), withScriptjs, withGoogleMap)(Map))