import React from 'react'
import { connect } from 'react-redux'
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps"
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox"
import { compose, withProps } from 'recompose'
import { GOOGLE_MAPS_API_KEY } from '../../secrets'
import { IoMdCloseCircle, IoMdArrowRoundUp } from 'react-icons/io'
import * as actions from '../store'
import Window from './Window'
import Markers from './Markers'

class Map extends React.Component {
  componentDidMount() {
    this.props.renderMarkers(this.props.user.id)
  }

  render() {
    const {
      mountMap, center, changeBounds, map, mountSearchBox, bounds, changePlace, searchBox, searchInput, 
      handleChange, clearSearchBox, infoWindow, toggleOffPanelDrawer, home } = this.props

    return (
      <GoogleMap
        ref={(map) => mountMap(map)}
        center={center}
        onBoundsChanged={() => changeBounds(map.getBounds())}
        defaultZoom={13}
        defaultOptions={mapSettings}
        onClick={() => toggleOffPanelDrawer()}>

        <SearchBox
          className="container"
          ref={(searchBox) => mountSearchBox(searchBox)}
          bounds={bounds}
          controlPosition={google.maps.ControlPosition.TOP_CENTER}
          onPlacesChanged={() => changePlace(searchBox.getPlaces()[0])}>
          <div id="searchBox" onClick={() => toggleOffPanelDrawer()}>
            <input
              name="searchInput"
              type="text"
              placeholder="Enter Destination"
              value={searchInput}
              onChange={(event) => handleChange(event)} />
            <div className={searchInput ? "clear-input active" : "clear-input"} onClick={clearSearchBox}><IoMdCloseCircle /></div>
            {home && !searchInput && <div className="home-popup"><span><IoMdArrowRoundUp /></span>Enter Home Address<span><IoMdArrowRoundUp /></span></div>}
          </div>
        </SearchBox>
        
        <Markers />
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
  infoWindow: state.infoWindow,
  home: state.home
})

const mapDispatch = (dispatch) => ({
  mountMap: (map) => dispatch(actions.mountMap(map)),
  mountSearchBox: (searchBox) => dispatch(actions.mountSearchBox(searchBox)),
  changeBounds: (bounds) => dispatch(actions.changeBounds(bounds)),
  changePlace: (place) => dispatch(actions.changePlace(place)),
  handleChange: (event) => dispatch(actions.handleChange(event)),
  clearSearchBox: () => dispatch(actions.clearSearchBox()),
  renderMarkers: (id) => dispatch(actions.renderMarkers(id)),
  toggleOffPanelDrawer: () => dispatch(actions.toggleOffPanelDrawer())
})

export default connect(mapState, mapDispatch)(compose(withProps(mapProperties), withScriptjs, withGoogleMap)(Map))