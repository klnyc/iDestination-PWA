const initialState = {
    center: NYC,
    bounds: null,
    map: {},
    searchBox: {},
    searchInput: '',
    markers: [],
    currentMarker: {},
    infoWindow: {}
}

const NYC = { lat: 40.7473735256486, lng: -73.98564376909184 }

const MOUNT_MARKERS = 'MOUNT_MARKERS'
const MOUNT_MAP = 'MOUNT_MAP'
const MOUNT_SEARCH_BOX = 'MOUNT_SEARCH_BOX'
const CHANGE_BOUNDS = 'CHANGE_BOUNDS'
const CHANGE_PLACE = 'CHANGE_PLACE'
const OPEN_INFO_WINDOW = 'OPEN_INFO_WINDOW'
const CLOSE_INFO_WINDOW = 'CLOSE_INFO_WINDOW'
const HANDLE_CHANGE = 'HANDLE_CHANGE'

export const mountMarkers = (markers) => ({ type: MOUNT_MARKERS, markers })
export const mountMap = (map) => ({ type: MOUNT_MAP, map })
export const mountSearchBox = (searchBox) => ({ type: MOUNT_SEARCH_BOX, searchBox })
export const changeBounds = (bounds) => ({ type: CHANGE_BOUNDS, bounds })
export const changePlace = (place) => {
    const lat = place.geometry.location.lat()
    const lng = place.geometry.location.lng()
    return {
        type: CHANGE_PLACE,
        center: { lat, lng },
        currentMarker: {
            position: { lat, lng },
            name: place.name,
            address: place.formatted_address
        },
        searchInput: `${place.name} ${place.formatted_address}`
    }
}
export const openInfoWindow = (marker) => ({ type: OPEN_INFO_WINDOW, infoWindow: marker })
export const closeInfoWindow = () => ({ type: CLOSE_INFO_WINDOW, infoWindow: {} })
export const handleChange = (event) => ({ type: HANDLE_CHANGE, [event.target.name]: event.target.value })

export default function mapReducer (state = initialState, action) {
    switch (action.type) {
        default:
            return state
    }
}