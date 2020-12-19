import React from 'react'
import { connect } from 'react-redux'
import { } from '../store'
import { WEATHER_API_KEY } from '../../global'

const unit = "imperial"
const city = "new york"
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${WEATHER_API_KEY}`

fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
    .catch(() => {
        console.log('Error with city')
    })

class Weather extends React.Component {
    render() {
        const { weather } = this.props
        return (
            <div className={weather? "weather card" : "invisible"}>

            </div>
        )
    }
}

const mapState = (state) => ({
    user: state.user,
    weather: state.weather
})

const mapDispatch = (dispatch) => ({
    
})

export default connect(mapState, mapDispatch)(Weather)