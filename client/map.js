import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox"
import { compose, withProps } from 'recompose'
import { GOOGLE_MAPS_API_KEY } from '../secrets'

class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      center: NYC,
      bounds: null,
      map: {},
      searchBox: {},
      markers: [],
      currentMarker: {},
      infoWindow: {}
    }
    this.onMapMounted = this.onMapMounted.bind(this)
    this.onSearchBoxMounted = this.onSearchBoxMounted.bind(this)
    this.onBoundsChanged = this.onBoundsChanged.bind(this)
    this.onPlacesChanged = this.onPlacesChanged.bind(this)
    this.openInfoWindow = this.openInfoWindow.bind(this)
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
      this.setState({markers})
    }, (error) => console.log(error.message))
  }

  onMapMounted(reference) {
    this.setState({map: reference})
  }

  onSearchBoxMounted(reference) {
    this.setState({searchBox: reference})
  }

  onBoundsChanged() {
    this.setState({bounds: this.state.map.getBounds()})
  }

  onPlacesChanged() {
    const place = this.state.searchBox.getPlaces()[0]
    const lat = place.geometry.location.lat()
    const lng = place.geometry.location.lng()
    this.setState({
      center: {lat, lng}, 
      currentMarker: {
        position: {lat, lng},
        name: place.name,
        address: place.formatted_address
      }
    })
  }

  openInfoWindow(marker) {
    this.setState({infoWindow: marker})
  }

  addPlace(marker) {
    firebase
    .firestore()
    .collection('users')
    .doc(this.props.userID)
    .collection('markers')
    .add(marker)
    .then(() => this.setState({infoWindow: {}}))
  }

  render() {
    return (
      <GoogleMap
        ref={this.onMapMounted}
        center={this.state.center}
        onBoundsChanged={this.onBoundsChanged}
        defaultZoom={15}
        defaultOptions={options}
      >

        <SearchBox
          ref={this.onSearchBoxMounted}
          bounds={this.state.bounds}
          controlPosition={google.maps.ControlPosition.TOP_CENTER}
          onPlacesChanged={this.onPlacesChanged}
        >
          <input
            id="searchBox"
            type="text"
            placeholder="Enter Destination"
          />
        </SearchBox>

        {this.state.markers.map((marker, index) =>
          <Marker 
            key={index} 
            position={marker.position}
            onClick={() => this.openInfoWindow(marker)}
          />
        )}

        {this.state.currentMarker.position && (
          <Marker 
            position={this.state.currentMarker.position} 
            onClick={() => this.openInfoWindow(this.state.currentMarker)}
          />
        )}

        {this.state.infoWindow.position && (
          <InfoWindow
            position={this.state.infoWindow.position}
            onCloseClick={() => this.setState({infoWindow: {}})}
          >
            <div className="infowindow">
              <p>{this.state.infoWindow.name}</p>
              <p>{this.state.infoWindow.address}</p>
              <p onClick={() => this.addPlace(this.state.currentMarker)}>ADD THIS PLACE</p>
            </div>
          </InfoWindow>
        )}

      </GoogleMap>
    )
  }
}

const NYC = {lat: 40.7473735256486, lng: -73.98564376909184}

const options = {
  disableDefaultUI: true,
  clickableIcons: false
}

const properties = {
  googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div id="map" />,
  mapElement: <div style={{ height: `100%` }} />
}

export default compose(withProps(properties), withScriptjs, withGoogleMap)(Map)