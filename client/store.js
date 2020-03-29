import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const NYC = { lat: 40.7473735256486, lng: -73.98564376909184 }

const initialState = {
    user: {},
    center: NYC,
    bounds: null,
    map: {},
    searchBox: {},
    searchInput: '',
    markers: [],
    currentMarker: {},
    infoWindow: {},
    drawer: false,
    panel: { experiences: false, wishlist: false }
}

const SET_USER_DATA = "SET_USER_DATA"
const LOG_OUT = 'LOG_OUT'
const TOGGLE_DRAWER = "TOGGLE_DRAWER"
const TOGGLE_PANEL_EXPERIENCES = "TOGGLE_PANEL_EXPERIENCES"
const TOGGLE_PANEL_WISHLIST = "TOGGLE_PANEL_WISHLIST"
const TOGGLE_OFF_PANELS = "TOGGLE_OFF_PANELS"
const GO_TO_MARKER = "GO_TO_MARKER"
const OPEN_INFO_WINDOW = 'OPEN_INFO_WINDOW'
const CLOSE_INFO_WINDOW = 'CLOSE_INFO_WINDOW'
const HANDLE_CHANGE = 'HANDLE_CHANGE'
const CLEAR_SEARCH_BOX = 'CLEAR_SEARCH_BOX'
const CLEAR_CURRENT_MARKER = 'CLEAR_CURRENT_MARKER'
const MOUNT_MARKERS = 'MOUNT_MARKERS'
const MOUNT_MAP = 'MOUNT_MAP'
const MOUNT_SEARCH_BOX = 'MOUNT_SEARCH_BOX'
const CHANGE_BOUNDS = 'CHANGE_BOUNDS'
const CHANGE_PLACE = 'CHANGE_PLACE'

export const setUserData = (user, id) => ({ type: SET_USER_DATA, user, id })
export const logout = () => ({ type: LOG_OUT })
export const toggleDrawer = (drawer) => ({ type: TOGGLE_DRAWER, drawer })
export const togglePanelExperiences = (panel) => ({ type: TOGGLE_PANEL_EXPERIENCES, panel })
export const togglePanelWishlist = (panel) => ({ type: TOGGLE_PANEL_WISHLIST, panel })
export const toggleOffPanels = () => ({ type: TOGGLE_OFF_PANELS })
export const goToMarker = (marker) => ({ type: GO_TO_MARKER, marker })
export const openInfoWindow = (marker) => ({ type: OPEN_INFO_WINDOW, infoWindow: marker })
export const closeInfoWindow = () => ({ type: CLOSE_INFO_WINDOW })
export const handleChange = (event) => ({ type: HANDLE_CHANGE, [event.target.name]: event.target.value })
export const clearSearchBox = () => ({ type: CLEAR_SEARCH_BOX })
export const clearCurrentMarker = () => ({ type: CLEAR_CURRENT_MARKER })
export const mountMarkers = (markers) => ({ type: MOUNT_MARKERS, markers })
export const mountMap = (map) => ({ type: MOUNT_MAP, map })
export const mountSearchBox = (searchBox) => ({ type: MOUNT_SEARCH_BOX, searchBox })
export const changeBounds = (bounds) => ({ type: CHANGE_BOUNDS, bounds })
export const changePlace = (place) => {
    const convertAddress = (place) => {
        const findComponent = (type) => place.address_components.find(component => component.types.includes(type))
        const streetNumber = findComponent('street_number') ? findComponent('street_number').long_name : null
        const streetName = findComponent('route') ? findComponent('route').long_name : null
        const subpremise = findComponent('subpremise') ? findComponent('subpremise').short_name.toUpperCase() : null
        const locality = findComponent('locality') ? findComponent('locality').long_name : null
        const area = findComponent('administrative_area_level_1') ? findComponent('administrative_area_level_1').long_name : null
        const country = findComponent('country') ? findComponent('country').long_name : null
        const street = [streetNumber, streetName].filter(x => x).join(' ') + (subpremise ? `, ${subpremise}` : '')
        const location = [locality, area, country].filter(x => x).join(', ')
        const city = locality ? locality : (area ? area : null)
        return { street, location, city }
    }

    const address = convertAddress(place)
    const lat = place.geometry.location.lat()
    const lng = place.geometry.location.lng()
    const today = new Date()
    const date = (today.getMonth() + 1) + '/' + today.getDate() + '/' + today.getFullYear()

    return {
        type: CHANGE_PLACE,
        searchInput: `${place.name} ${address.street} ${address.city}`,
        center: { lat, lng },
        currentMarker: {
            position: { lat, lng },
            name: place.name,
            street: address.street,
            location: address.location,
            city: address.city,
            experiences: false,
            wishlist: false,
            date
        },
        infoWindow: {
            position: { lat, lng },
            name: place.name,
            street: address.street,
            location: address.location,
            city: address.city,
            experiences: false,
            wishlist: false,
            date
        }
    }
}

export const login = (user) => {
    return (dispatch) => {
        firebase
        .firestore()
        .collection('users')
        .doc(user.uid).get()
        .then((data) => dispatch(setUserData(data.data(), user.uid)))
    }
}

export const renderMarkers = (id) => {
    return (dispatch) => {
        const markers = []
        firebase
        .firestore()
        .collection('users')
        .doc(id)
        .collection('markers')
        .onSnapshot(snapshot => {
            snapshot.docs.forEach(doc => markers.push(doc.data()))
            dispatch(mountMarkers(markers))
        }, (error) => console.log(error.message))
    }
}

export const addMarker = (id, marker, category) => {
    if (category === 'experiences') {marker = { ...marker, experiences: true }}
    if (category === 'wishlist') {marker = { ...marker, wishlist: true }}
    return (dispatch) => {
        firebase
        .firestore()
        .collection('users')
        .doc(id)
        .collection('markers')
        .add(marker)
        .then(() => dispatch(renderMarkers(id)))
        .then(() => {dispatch(clearSearchBox()); dispatch(closeInfoWindow())})
    }
}

export const removeMarker = (id, marker) => {
    return (dispatch) => {
        firebase
        .firestore()
        .collection('users')
        .doc(id)
        .collection('markers')
        .where('name', '==', `${marker.name}`)
        .get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                firebase
                .firestore()
                .collection('users')
                .doc(id)
                .collection('markers')
                .doc(doc.id)
                .delete()
            })
        })
        .then(() => dispatch(renderMarkers(id)))
        .then(() => {dispatch(clearSearchBox()); dispatch(clearCurrentMarker()); dispatch(closeInfoWindow())})
    }
}

function reducer (state = initialState, action) {
    switch (action.type) {
        case SET_USER_DATA:
            return { ...state, user: { ...action.user, id: action.id } }
        case LOG_OUT:
            return { ...state, user: {}, infoWindow: {}, searchInput: '', drawer: false }
        case TOGGLE_DRAWER:
            return { ...state, drawer: !action.drawer }
        case TOGGLE_PANEL_EXPERIENCES:
            return { ...state, panel: { experiences: !action.panel, wishlist: false } }
        case TOGGLE_PANEL_WISHLIST:
            return { ...state, panel: { experiences: false, wishlist: !action.panel } }
        case TOGGLE_OFF_PANELS:
            return { ...state, drawer: false, panel: { experiences: false, wishlist: false } }
        case GO_TO_MARKER:
            return { ...state, infoWindow: action.marker, center: action.marker.position }
        case OPEN_INFO_WINDOW:
            return { ...state, infoWindow: action.infoWindow }
        case CLOSE_INFO_WINDOW:
            return { ...state, infoWindow: {}, currentMarker: {} }
        case HANDLE_CHANGE:
            return { ...state, [event.target.name]: action[event.target.name] }
        case CLEAR_SEARCH_BOX:
            return { ...state, searchInput: '' }
        case CLEAR_CURRENT_MARKER:
            return { ...state, currentMarker: {} }
        case MOUNT_MARKERS:
            return { ...state, markers: action.markers }
        case MOUNT_MAP:
            return { ...state, map: action.map }
        case MOUNT_SEARCH_BOX:
            return { ...state, searchBox: action.searchBox }
        case CHANGE_BOUNDS:
            return { ...state, bounds: action.bounds }
        case CHANGE_PLACE:
            return { ...state, center: action.center, currentMarker: action.currentMarker, searchInput: action.searchInput, infoWindow: action.infoWindow }
        default:
            return state
    }
}

export default createStore(reducer, applyMiddleware(thunk))