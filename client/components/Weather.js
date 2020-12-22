import React from 'react'
import { connect } from 'react-redux'
import { } from '../store'
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
            weatherSearchInput: '',
            unit: 'Imperial',
            cities: [],
            error: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.addWeatherCity = this.addWeatherCity.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    addWeatherCity() {
        const { weatherSearchInput, unit } = this.state
        if (!weatherSearchInput) return
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherSearchInput}&units=${unit}&appid=${WEATHER_API_KEY}`
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    this.setState({ weatherSearchInput: ''})
                    console.log(data)
                } else {
                    this.setState({ error: 'Invalid City'})
                }
            })
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
            {error && <div>{error}</div>}
            </div>
        )
    }
}

const mapState = (state) => ({
    user: state.user
})

const mapDispatch = (dispatch) => ({
    
})

export default connect(mapState, mapDispatch)(Weather)