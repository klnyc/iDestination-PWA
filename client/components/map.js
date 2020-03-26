import React from 'react'
import { connect } from 'react-redux'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox"
import { compose, withProps } from 'recompose'
import { GOOGLE_MAPS_API_KEY } from '../../secrets'
import { IoMdCloseCircle } from 'react-icons/io'
import * as actions from '../store'
import Window from './Window'

class Map extends React.Component {
  componentDidMount() {
    this.props.renderMarkers(this.props.user.id)
  }

  render() {
    const {
      mountMap, center, changeBounds, map, mountSearchBox, bounds, changePlace, 
      searchBox, searchInput, handleChange, clearSearchBox, markers, openInfoWindow, 
      currentMarker, infoWindow, toggleOffPanels } = this.props

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
          <div id="searchBox" onClick={() => toggleOffPanels()}>
            <input
              name="searchInput"
              type="text"
              placeholder="Enter Destination"
              value={searchInput}
              onChange={(event) => handleChange(event)} />
            <div className={searchInput ? "clear-input active" : "clear-input"} onClick={clearSearchBox}><IoMdCloseCircle /></div>
          </div>
        </SearchBox>
        
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

        {infoWindow.position && <Window />}

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
  loadingElement: <div className="map-google" />,
  containerElement: <div className="map" />,
  mapElement: <div className="map-google" />
}

const mapState = (state) => ({
  user: state.user,
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
  handleChange: (event) => dispatch(actions.handleChange(event)),
  clearSearchBox: () => dispatch(actions.clearSearchBox()),
  renderMarkers: (id) => dispatch(actions.renderMarkers(id)),
  toggleOffPanels: () => dispatch(actions.toggleOffPanels())
})

export default connect(mapState, mapDispatch)(compose(withProps(mapProperties), withScriptjs, withGoogleMap)(Map))