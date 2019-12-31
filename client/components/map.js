import React from 'react'
import { connect } from 'react-redux'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox"
import { compose, withProps } from 'recompose'
import { GOOGLE_MAPS_API_KEY } from '../../secrets'
import * as actions from '../store'

class Map extends React.Component {
  constructor() {
    super()
    this.addPlace = this.addPlace.bind(this)
  }

  componentDidMount() {
    const markers = []
    firebase
    .firestore()
    .collection('users')
    .doc(this.props.userID)
    .collection('markers')
    .onSnapshot(snapshot => {
      snapshot.docs.forEach(doc => markers.push(doc.data()))
      this.props.mountMarkers(markers)
    }, (error) => console.log(error.message))
  }

  addPlace(marker) {
    firebase
    .firestore()
    .collection('users')
    .doc(this.props.userID)
    .collection('markers')
    .add(marker)
    .then(() => this.props.closeInfoWindow())
  }

  render() {
    return (
      <GoogleMap
        ref={(map) => this.props.mountMap(map)}
        center={this.props.center}
        onBoundsChanged={() => this.props.changeBounds(this.props.map.getBounds())}
        defaultZoom={15}
        defaultOptions={mapSettings}
      >

        <SearchBox
          ref={(searchBox) => this.props.mountSearchBox(searchBox)}
          bounds={this.props.bounds}
          controlPosition={google.maps.ControlPosition.TOP_CENTER}
          onPlacesChanged={() => this.props.changePlace(this.props.searchBox.getPlaces()[0])}
        >
          <input
            id="searchBox"
            name="searchInput"
            type="text"
            placeholder="Enter Destination"
            value={this.props.searchInput}
            onChange={(event) => this.props.handleChange(event)}
          />
        </SearchBox>
        
        {this.props.markers.map((marker, index) =>
          <Marker 
            key={index} 
            position={marker.position}
            onClick={() => this.props.openInfoWindow(marker)}
          />
        )}

        {this.props.currentMarker.position && (
          <Marker 
            position={this.props.currentMarker.position} 
            onClick={() => this.props.openInfoWindow(this.props.currentMarker)}
          />
        )}

        {this.props.infoWindow.position && (
          <InfoWindow
            position={this.props.infoWindow.position}
            onCloseClick={() => this.props.closeInfoWindow()}
          >
            <div className="infoWindow">
              <p>{this.props.infoWindow.name}</p>
              <p>{this.props.infoWindow.address}</p>
              <p onClick={() => this.addPlace(this.props.currentMarker)}>ADD THIS PLACE</p>
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
  handleChange: (event) => dispatch(actions.handleChange(event))
})

export default connect(mapState, mapDispatch)(compose(withProps(mapProperties), withScriptjs, withGoogleMap)(Map))