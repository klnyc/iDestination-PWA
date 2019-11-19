import React from 'react'
import { GOOGLE_MAPS_API_KEY } from '../secrets'

export default class extends React.Component {
    componentDidMount() {
        window.initMap = initMap
        loadScript(`https:maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap&libraries=places`)
    }                       

    render() {
        return (
            <div id="mapContainer">
                <input id="searchBox" type="text" size="50" placeholder="Enter Destination"></input>
                <div id="map"></div>
            </div>
        )
    }
}

const newYork = {lat: 40.7473735256486, lng: -73.98564376909184}

function loadScript(url) {
    const index = window.document.getElementsByTagName("script")[0]
    const script = window.document.createElement("script")
    script.src = url
    script.async = true
    script.defer = true
    index.parentNode.insertBefore(script, index)
}

function initMap() {
    const map = new window.google.maps.Map(document.getElementById('map'), {
        center: newYork,
        zoom: 14,
        disableDefaultUI: true
    })
    const searchBox = new window.google.maps.places.SearchBox(document.getElementById('searchBox'), {
        types: ['establishment', 'address']
    })
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('searchBox'))
    map.addListener('bounds_changed', function() {
        searchBox.setBounds(map.getBounds())
    })
    let markers = [{
        title: 'Raku',
        position: {lat: 40.7264758, lng: -73.9866672}
    }]
    markers.map(marker => new google.maps.Marker({map, ...marker}))
    searchBox.addListener('places_changed', function() {
        let bounds = new google.maps.LatLngBounds()
        let places = searchBox.getPlaces()
        if (!places.length) return
        places.forEach(place => {
            if (!place.geometry) return
            console.log(place.geometry.location.lat(), place.geometry.location.lng())
            markers.push(new google.maps.Marker({
                map: map,
                title: place.name,
                position: place.geometry.location
            }))
            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport);
              } else {
                bounds.extend(place.geometry.location);
              }
        })
        map.fitBounds(bounds)
    })
} 