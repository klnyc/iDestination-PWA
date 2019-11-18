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
                <input id="search" type="text" size="50" placeholder="Anything you want!"></input>
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
        zoom: 12,
        disableDefaultUI: true
    })
    const search = new window.google.maps.places.SearchBox(document.getElementById('search'), {
        types: ['establishment', 'address']
    })
    return map, search
}