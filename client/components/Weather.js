import React, { Fragment, useReducer } from 'react'
import { connect } from 'react-redux'
import { setUserData } from '../store'
import { FaTrash } from "react-icons/fa"
import { IoIosAddCircleOutline } from "react-icons/io"
import { WEATHER_API_KEY } from '../../global'

class Weather extends React.Component {
    constructor() {
        super()
        this.state = {
            weatherCities: [],
            weatherSearchInput: '',
            error: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.weatherAPI_url = this.weatherAPI_url.bind(this)
        this.updateUserState = this.updateUserState.bind(this)
        this.queryWeatherCities = this.queryWeatherCities.bind(this)
        this.addWeatherCity = this.addWeatherCity.bind(this)
        this.removeWeatherCity = this.removeWeatherCity.bind(this)
        this.renderWeatherCities = this.renderWeatherCities.bind(this)
        this.changeTemperatureUnit = this.changeTemperatureUnit.bind(this)
    }

    componentDidMount() {
        this.queryWeatherCities()
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    weatherAPI_url(city, unit) {
        return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit || 'imperial'}&appid=${WEATHER_API_KEY}`
    }

    updateUserState() {
        const { user, setUserData } = this.props
        firebase
        .firestore()
        .collection('users')
        .doc(user.id)
        .get()
        .then((userDocument) => {
            setUserData(userDocument.data())
            this.queryWeatherCities()
        })
    }

    queryWeatherCities() {
        const { weatherCities, unit } = this.props.user.weather
        const weatherRequests = weatherCities.map((city) => fetch(this.weatherAPI_url(city, unit)))

        Promise.all(weatherRequests)
        .then((weatherPromises) => {
            return Promise.all(weatherPromises.map((weatherPromise) => {
                return weatherPromise.json().then(weatherData => weatherData)
            }))
        })
        .then((weatherData) => this.setState({ weatherCities: weatherData }))
    }

    addWeatherCity() {
        const { user } = this.props
        const { weatherSearchInput } = this.state

        if (!weatherSearchInput) return
        fetch(this.weatherAPI_url(weatherSearchInput))
        .then(response => response.json())
        .then(weatherData => {
            if (weatherData.id) {
                this.setState({ weatherSearchInput: '', error: '' })
                firebase
                .firestore()
                .collection('users')
                .doc(user.id)
                .update({ ['weather.weatherCities']: firebase.firestore.FieldValue.arrayUnion(weatherData.name) })
                .then(this.updateUserState)
            } else {
                this.setState({ error: 'Invalid City'})
            }
        })
    }

    removeWeatherCity(city) {
        const { user } = this.props
        firebase
        .firestore()
        .collection('users')
        .doc(user.id)
        .update({ ['weather.weatherCities']: firebase.firestore.FieldValue.arrayRemove(city) })
        .then(this.updateUserState)
    }

    renderWeatherCities(weatherCities) {
        const { user } = this.props
        return (
            <Fragment>
                {weatherCities.map((city, index) => {
                    console.log(city)
                    return (
                        <div key={index} className="weather-row">
                            <div className="weather-column">{city.name}</div>
                            <div className="weather-column">{Math.round(city.main.temp)}° {user.weather.unit === "Metric" ? "C" : "F"}</div>
                            <div className="weather-column">Icon</div>
                            <div className="weather-icon-trash"><FaTrash className="plain-link" style={{ color: 'silver' }} onClick={() => this.removeWeatherCity(city.name)} /></div>
                        </div>
                    )
                })}
            </Fragment>
        )
    }

    changeTemperatureUnit(unit) {
        const { user } = this.props
        const newUnit = (unit === 'F') ? 'Imperial' : 'Metric'
        firebase
        .firestore()
        .collection('users')
        .doc(user.id)
        .update({ ['weather.unit']: newUnit })
        .then(this.updateUserState)
    }

    render() {
        const { weatherCities, weatherSearchInput, error } = this.state
        return (
            <div className="panel card">
                <div className="panel-title">Weather</div>
                <div className="weather-top">
                    <div className="weather-temperature">
                        <span className="plain-link" onClick={() => this.changeTemperatureUnit('F')}>F</span>
                        <span> | </span>
                        <span className="plain-link" onClick={() => this.changeTemperatureUnit('C')}>C</span>
                    </div>
                    <div className="weather-input">
                        <input name="weatherSearchInput" type="text" value={weatherSearchInput} placeholder="Enter City" onChange={this.handleChange} autoComplete="off"></input>
                        <div className="weather-icon-add"><IoIosAddCircleOutline className="plain-link" onClick={this.addWeatherCity} /></div>
                    </div>
                </div>
                <div className="weather-error">{error}</div>
                {this.renderWeatherCities(weatherCities)}
            </div>
        )
    }
}

const mapState = (state) => ({
    user: state.user
})

const mapDispatch = (dispatch) => ({
    setUserData: (userData) => dispatch(setUserData(userData))
})

export default connect(mapState, mapDispatch)(Weather)