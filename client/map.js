import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox"
import { compose, withProps } from 'recompose'
import { GOOGLE_MAPS_API_KEY } from '../secrets'

class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      center: NYC,
      bounds: null,
      map: {},
      searchBox: {}
    }
    this.onMapMounted = this.onMapMounted.bind(this)
    this.onSearchBoxMounted = this.onSearchBoxMounted.bind(this)
    this.onBoundsChanged = this.onBoundsChanged.bind(this)
    this.onPlacesChanged = this.onPlacesChanged.bind(this)
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
    this.setState({center: {lat, lng}})
  }

  render() {
    return (
      <GoogleMap
        ref={this.onMapMounted}
        center={this.state.center}
        onBoundsChanged={this.onBoundsChanged}
        defaultZoom={15}
      >
        <SearchBox
          ref={this.onSearchBoxMounted}
          bounds={this.state.bounds}
          controlPosition={google.maps.ControlPosition.TOP_LEFT}
          onPlacesChanged={this.onPlacesChanged}
        >
          <input
            id="searchBox"
            type="text"
            placeholder="Enter Destination"
          />
        </SearchBox>
        {/* {props.markers.map((marker, index) =>
          <Marker key={index} position={marker.position} />
        )} */}
      </GoogleMap>
    )
  }
}

export default compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div id="mapContainer" />,
    containerElement: <div id="mapContainer" />,
    mapElement: <div id="mapContainer" />
  }),
  withScriptjs,
  withGoogleMap
)(Map)

const NYC = {lat: 40.7473735256486, lng: -73.98564376909184}