import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { InfoWindow } from "react-google-maps"
import { FaTrash } from "react-icons/fa"
import { MdStar } from 'react-icons/md'
import { GiFire } from 'react-icons/gi'
import { addMarker, removeMarker, closeInfoWindow } from '../store'

class Window extends React.Component {
    constructor() {
        super()
        this.state = { 
            month: '',
            day: '',
            year: '',
            error: ''
        }
        this.renderInfoWindowFooter = this.renderInfoWindowFooter.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.renderDatePicker = this.renderDatePicker.bind(this)
        this.submitPlace = this.submitPlace.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    renderInfoWindowFooter() {
        const { user, infoWindow, removeMarker } = this.props
        let categoryIcons
        if (infoWindow.experiences && infoWindow.wishlist) categoryIcons = <div><GiFire /><MdStar /></div>
        else if (infoWindow.experiences) categoryIcons = <div><GiFire /></div>
        else if (infoWindow.wishlist) categoryIcons = <div><MdStar /></div>
        return (
          <div className="infoWindow-footer">
            {categoryIcons}
            <div className="infoWindow-icon-trash" onClick={() => removeMarker(user.id, infoWindow)}><FaTrash /></div>
          </div>
        )
    }

    renderDatePicker() {
        const { month, day, year , error} = this.state
        return (
            <Fragment>
                <div className="datepicker">
                    <input name="month" type="number" placeholder="MM" value={month} onChange={this.handleChange} />-
                    <input name="day" type="number" placeholder="DD" value={day} onChange={this.handleChange} />-
                    <input name="year" type="number" placeholder="YYYY" value={year} onChange={this.handleChange} />
                </div>
                {error && <div className="datepicker-error">{error}</div>}
            </Fragment>
        )
    }

    submitPlace(category) {
        const { month, day, year } = this.state
        const { user, currentMarker, addMarker } = this.props
        if (!month && !day && !year) {
            addMarker(user.id, currentMarker, this.state, category)
        }
        else if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1920 || year > 3000) {
            this.setState({ error: 'Invalid date' })
        } else {
            addMarker(user.id, currentMarker, this.state, category)
        }
    }

    render() {
        const { infoWindow, markers, closeInfoWindow } = this.props;
        return (
            <InfoWindow position={infoWindow.position} onCloseClick={() => closeInfoWindow()}>
                <div className="infoWindow">
                    <div className="infoWindow-name">{infoWindow.name}</div>
                    <div className="infoWindow-address">{infoWindow.street}</div>
                    <div className="infoWindow-address">{infoWindow.location}</div>

                    {markers.indexOf(infoWindow) === -1 &&
                    <div className="infoWindow-add-container">
                        {this.renderDatePicker()}
                        <div className="infoWindow-add-button" onClick={() => this.submitPlace('experiences')}>Add Experience</div>
                        <div className="infoWindow-add-button" onClick={() => this.submitPlace('wishlist')}>Add Wish</div>
                    </div>}

                    {markers.includes(infoWindow) && 
                    <div>
                        <div className="infoWindow-date">{infoWindow.date}</div>
                        {this.renderInfoWindowFooter()}
                    </div>}
                </div>
            </InfoWindow>
        )
    }
}

const mapState = (state) => ({
    user: state.user,
    markers: state.markers,
    currentMarker: state.currentMarker,
    infoWindow: state.infoWindow
})

const mapDispatch = (dispatch) => ({
    addMarker: (id, marker, date, category) => dispatch(addMarker(id, marker, date, category)),
    removeMarker: (id, marker) => dispatch(removeMarker(id, marker)),
    closeInfoWindow: () => dispatch(closeInfoWindow())
})

export default connect(mapState, mapDispatch)(Window)