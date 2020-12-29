import React from 'react'
import { connect } from 'react-redux'
import { setUserData } from '../store'
import { IoIosAddCircleOutline } from "react-icons/io"
import { WEATHER_API_KEY } from '../../global'

/**
 * Local State Weather Search Input
 * Take search input string, check if string is valid/ valid API
 * Send the city to user weather object in database
 * Query all user cities in database, grab all city APIs
 * Mount all city APIs to state
 * Render all cities { city, temperature, weather}
 * 
 */

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
        this.queryWeatherCities = this.queryWeatherCities.bind(this)
        this.addWeatherCity = this.addWeatherCity.bind(this)
        this.renderWeatherCities = this.renderWeatherCities.bind(this)
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
        const { user, setUserData } = this.props
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
                .update({ ['weather.weatherCities']: firebase.firestore.FieldValue.arrayUnion(weatherSearchInput) })
                .then(() => {
                    firebase
                    .firestore()
                    .collection('users')
                    .doc(user.id)
                    .get()
                    .then((userDocument) => {
                        setUserData(userDocument.data())
                        this.queryWeatherCities()
                    })
                })
            } else {
                this.setState({ error: 'Invalid City'})
            }
        })
    }

    renderWeatherCities() {
        const { weatherCities } = this.state
        return (
            <div>
                {weatherCities.map((city) => {
                    return <div key={Math.random() * 10000}>{city.name}</div>
                })}
            </div>
        )
    }

    render() {
        const { weatherSearchInput, error } = this.state
        return (
            <div className="panel card">
                <div className="panel-title">Weather</div>
                <div className="weather-input">
                    <input name="weatherSearchInput" type="text" value={weatherSearchInput} onChange={this.handleChange} autoComplete="off"></input>
                    <IoIosAddCircleOutline onClick={this.addWeatherCity} />
                </div>
            {this.renderWeatherCities()}
            {error && <div>{error}</div>}
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