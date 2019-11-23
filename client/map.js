import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { SearchBox } from "react-google-maps/lib/components/places/SearchBox"
import { compose, withProps, lifecycle } from 'recompose'
import { GOOGLE_MAPS_API_KEY } from '../secrets'

export default compose(
    withProps({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div id="mapContainer" />,
      containerElement: <div id="mapContainer" />,
      mapElement: <div id="mapContainer" />
    }),
    lifecycle({
      componentWillMount() {
        const refs = {}
  
        this.setState({
          bounds: null,
          center: {
            lat: 41.9, lng: -87.624
          },
          markers: [],
          onMapMounted: ref => {
            refs.map = ref;
          },
          onBoundsChanged: () => {
            this.setState({
              bounds: refs.map.getBounds(),
              center: refs.map.getCenter(),
            })
          },
          onSearchBoxMounted: ref => {
            refs.searchBox = ref;
          },
          onPlacesChanged: () => {
            const places = refs.searchBox.getPlaces();
            const bounds = new google.maps.LatLngBounds();
  
            places.forEach(place => {
              if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport)
              } else {
                bounds.extend(place.geometry.location)
              }
            });
            const nextMarkers = places.map(place => ({
              position: place.geometry.location,
            }));
            const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
  
            this.setState({
              center: nextCenter,
              markers: nextMarkers,
            });
            // refs.map.fitBounds(bounds);
          },
        })
      },
    }),
    withScriptjs,
    withGoogleMap
  )(props =>
    <GoogleMap
      ref={props.onMapMounted}
      defaultZoom={14}
      center={newYork}
      onBoundsChanged={props.onBoundsChanged}
    >
      <SearchBox
        ref={props.onSearchBoxMounted}
        bounds={props.bounds}
        controlPosition={google.maps.ControlPosition.TOP_LEFT}
        onPlacesChanged={props.onPlacesChanged}
      >
        <input
          type="text"
          placeholder="Enter Destination"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            marginTop: `27px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </SearchBox>
      {props.markers.map((marker, index) =>
        <Marker key={index} position={marker.position} />
      )}
    </GoogleMap>
  );

// const Map = withScriptjs(withGoogleMap(() => {
//     return (
//         <GoogleMap
//             defaultZoom={14}
//             defaultCenter={newYork}
//         />
//     )
// }))

// export default () => {
//     return (
//         <div id="mapContainer">
//             <Map 
//                 googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_MAPS_API_KEY}`}
//                 loadingElement={<div id="mapContainer" />}
//                 containerElement={<div id="mapContainer" />}
//                 mapElement={<div id="mapContainer" />}
//             />
//         </div>
//     )
// }

const newYork = {lat: 40.7473735256486, lng: -73.98564376909184}

// export default class extends React.Component {
//     componentDidMount() {
//         window.initMap = initMap
//         loadScript(`https:maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=places`)
//     }

//     render() {
//         return (
//             <div id="mapContainer">
//                 <input id="searchBox" type="text" size="50" placeholder="Enter Destination"></input>
//                 <div id="map"></div>
//             </div>
//         )
//     }
// }

// function loadScript(url) {
//     const index = window.document.getElementsByTagName("script")[0]
//     const script = window.document.createElement("script")
//     script.src = url
//     script.async = true
//     script.defer = true
//     index.parentNode.insertBefore(script, index)
// }

// function initMap() {
//     const map = new window.google.maps.Map(document.getElementById('map'), {
//         center: newYork,
//         zoom: 14,
//         disableDefaultUI: true
//     })
//     const searchBox = new window.google.maps.places.SearchBox(document.getElementById('searchBox'), {
//         types: ['establishment', 'address']
//     })
//     map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('searchBox'))
//     map.addListener('bounds_changed', function() {
//         searchBox.setBounds(map.getBounds())
//     })
//     let markers = [{
//         title: 'Raku',
//         position: {lat: 40.7264758, lng: -73.9866672}
//     }]
//     markers.map(marker => new google.maps.Marker({map, ...marker}))
//     searchBox.addListener('places_changed', function() {
//         let bounds = new google.maps.LatLngBounds()
//         let places = searchBox.getPlaces()
//         if (!places.length) return
//         places.forEach(place => {
//             if (!place.geometry) return
//             console.log(place.geometry.location.lat(), place.geometry.location.lng())
//             markers.push(new google.maps.Marker({
//                 map: map,
//                 title: place.name,
//                 position: place.geometry.location
//             }))
//             if (place.geometry.viewport) {
//                 bounds.union(place.geometry.viewport);
//               } else {
//                 bounds.extend(place.geometry.location);
//               }
//         })
//         map.fitBounds(bounds)
//     })
// } 