import React from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'
import { GOOGLE_MAPS_API_KEY } from '../secrets'

// const map = () => {
//     return (
//         <GoogleMap 
//             defaultZoom={10} 
//             defaultCenter={newYork} 
//             options={mapOptions}
//         >
//             <Marker position={newYork} />
//         </GoogleMap>
        
//     )
// }

// export default () => {
//     return (
//         <Map 
//             googleMapURL={googleMapURL}
//             loadingElement={<div id="map"/>}
//             containerElement={<div id="map" />}
//             mapElement={<div id="map" />}
//         />
//     )
// }

export default class extends React.Component {
    componentDidMount() {
        this.renderMap()
    }
    
    renderMap() {
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`)
        window.initMap = this.initMap
    }

    initMap() {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center: newYork,
            zoom: 10
        })
    }

    render() {
        return (
            <div id="map"></div>
        )
    }
}

// const Map = withScriptjs(withGoogleMap(map))
// const googleMapURL = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_MAPS_API_KEY}`
const newYork = {lat: 40.7473735256486, lng: -73.98564376909184}
const mapOptions = {
    clickableIcons:false,
    fullscreenControl:false,
    zoomControl: false,
    mapTypeControl: false
}

function loadScript(url) {
    const s = window.document.getElementsByTagName("script")
    const index = window.document.getElementsByTagName("script")[0]
    console.log(s)
    const script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}