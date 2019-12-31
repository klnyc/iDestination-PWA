import { createStore } from 'redux'

const NYC = { lat: 40.7473735256486, lng: -73.98564376909184 }

const initialState = {
    isLoggedIn: false,
    userID: '',
    center: NYC,
    bounds: null,
    map: {},
    searchBox: {},
    searchInput: '',
    markers: [],
    currentMarker: {},
    infoWindow: {}
}

const LOGGED_IN = 'LOGGED_IN'
const LOGGED_OUT = 'LOGGED_OUT'
const MOUNT_MARKERS = 'MOUNT_MARKERS'
const MOUNT_MAP = 'MOUNT_MAP'
const MOUNT_SEARCH_BOX = 'MOUNT_SEARCH_BOX'
const CHANGE_BOUNDS = 'CHANGE_BOUNDS'
const CHANGE_PLACE = 'CHANGE_PLACE'
const OPEN_INFO_WINDOW = 'OPEN_INFO_WINDOW'
const CLOSE_INFO_WINDOW = 'CLOSE_INFO_WINDOW'
const HANDLE_CHANGE = 'HANDLE_CHANGE'
const CLEAR_SEARCH_BOX = 'CLEAR_SEARCH_BOX'

export const login = (user) => ({ type: LOGGED_IN, userID: user.uid })
export const logout = () => ({ type: LOGGED_OUT })
export const openInfoWindow = (marker) => ({ type: OPEN_INFO_WINDOW, infoWindow: marker })
export const closeInfoWindow = () => ({ type: CLOSE_INFO_WINDOW })
export const handleChange = (event) => ({ type: HANDLE_CHANGE, [event.target.name]: event.target.value })
export const clearSearchBox = () => ({ type: CLEAR_SEARCH_BOX })
export const mountMarkers = (markers) => ({ type: MOUNT_MARKERS, markers })
export const mountMap = (map) => ({ type: MOUNT_MAP, map })
export const mountSearchBox = (searchBox) => ({ type: MOUNT_SEARCH_BOX, searchBox })
export const changeBounds = (bounds) => ({ type: CHANGE_BOUNDS, bounds })
export const changePlace = (place) => {
    const lat = place.geometry.location.lat()
    const lng = place.geometry.location.lng()
    return {
        type: CHANGE_PLACE,
        searchInput: `${place.name} ${place.formatted_address}`,
        center: { lat, lng },
        currentMarker: {
            position: { lat, lng },
            name: place.name,
            address: place.formatted_address
        },
        infoWindow: {
            position: { lat, lng },
            name: place.name,
            address: place.formatted_address
        }
    }
}

function reducer (state = initialState, action) {
    switch (action.type) {
        case LOGGED_IN:
            return { ...state, isLoggedIn: true, userID: action.userID }
        case LOGGED_OUT:
            return {
                ...state,
                isLoggedIn: false,
                userID: '',
                infoWindow: {},
                searchInput: ''
            }
        case MOUNT_MARKERS:
            return { ...state, markers: action.markers }
        case MOUNT_MAP:
            return { ...state, map: action.map }
        case MOUNT_SEARCH_BOX:
            return { ...state, searchBox: action.searchBox }
        case CHANGE_BOUNDS:
            return { ...state, bounds: action.bounds }
        case CHANGE_PLACE:
            return { 
                ...state,
                center: action.center,
                currentMarker: action.currentMarker,
                searchInput: action.searchInput,
                infoWindow: action.infoWindow
            }
        case OPEN_INFO_WINDOW:
                return { ...state, infoWindow: action.infoWindow }
        case CLOSE_INFO_WINDOW:
            return { ...state, infoWindow: {} }
        case HANDLE_CHANGE:
            return { ...state, [event.target.name]: action[event.target.name]}
        case CLEAR_SEARCH_BOX:
            return { ...state, searchInput: '' }
        default:
            return state
    }
}

export default createStore(reducer)