import React from 'react'
import { connect } from 'react-redux'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox"
import { compose, withProps } from 'recompose'
import { GOOGLE_MAPS_API_KEY } from '../../secrets'
import store from '../store'
import { mountMarkers, mountMap, mountSearchBox, changeBounds, changePlace, openInfoWindow, closeInfoWindow, handleChange } from '../reducers/mapReducer'

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
      store.dispatch(mountMarkers(markers))
    }, (error) => console.log(error.message))
  }

  addPlace(marker) {
    firebase
    .firestore()
    .collection('users')
    .doc(this.props.userID)
    .collection('markers')
    .add(marker)
    .then(() => store.dispatch(closeInfoWindow()))
  }

  render() {
    return (
      <GoogleMap
        ref={(map) => store.dispatch(mountMap(map))}
        center={this.props.center}
        onBoundsChanged={() => store.dispatch(changeBounds(this.props.map.getBounds()))}
        defaultZoom={15}
        defaultOptions={mapSettings}
      >

        <SearchBox
          ref={(searchBox) => store.dispatch(mountSearchBox(searchBox))}
          bounds={this.props.bounds}
          controlPosition={google.maps.ControlPosition.TOP_CENTER}
          onPlacesChanged={() => store.dispatch(changePlace(this.props.searchBox.getPlaces()[0]))}
        >
          <input
            id="searchBox"
            name="searchInput"
            type="text"
            placeholder="Enter Destination"
            value={this.props.searchInput}
            onChange={(event) => store.dispatch(handleChange(event))}
          />
        </SearchBox>
        
        {this.props.markers.map((marker, index) =>
          <Marker 
            key={index} 
            position={marker.position}
            onClick={() => store.dispatch(openInfoWindow(marker))}
          />
        )}

        {this.props.currentMarker.position && (
          <Marker 
            position={this.props.currentMarker.position} 
            onClick={() => store.dispatch(openInfoWindow(this.props.currentMarker))}
          />
        )}

        {this.props.infoWindow.position && (
          <InfoWindow
            position={this.props.infoWindow.position}
            onCloseClick={() => store.dispatch(closeInfoWindow())}
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

const mapState = (state) => {
  return {
      userID: state.login.userID,
      center: state.map.center,
      bounds: state.map.bounds,
      map: state.map.map,
      searchBox: state.map.searchBox,
      searchInput: state.map.searchInput,
      markers: state.map.markers,
      currentMarker: state.map.currentMarker,
      infoWindow: state.map.infoWindow
  }
}

export default connect(mapState)(compose(withProps(mapProperties), withScriptjs, withGoogleMap)(Map))