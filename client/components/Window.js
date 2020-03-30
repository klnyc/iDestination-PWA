import React from 'react'
import { connect } from 'react-redux'
import { InfoWindow } from "react-google-maps"
import { FaTrash } from "react-icons/fa"
import { MdStar } from 'react-icons/md'
import { GiFire } from 'react-icons/gi'
import { addMarker, removeMarker, closeInfoWindow } from '../store'

class Window extends React.Component {
    constructor() {
        super()
        this.state = { date: '' }
        this.renderInfoWindowFooter = this.renderInfoWindowFooter.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentDidMount() {
        const today = new Date()
        let month = (today.getMonth() + 1)
        let day = today.getDate()
        month = month < 10 ? ('0' + month) : month
        day = day < 10 ? ('0' + day) : day
        const date = today.getFullYear() + '-' + month + '-' + day
        this.setState({ date })
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
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

    render() {
        const { date } = this.state
        const { infoWindow, user, currentMarker, markers, closeInfoWindow, addMarker } = this.props;console.log(infoWindow)
        return (
            <InfoWindow position={infoWindow.position} onCloseClick={() => closeInfoWindow()}>
                <div className="infoWindow">
                    <div className="infoWindow-name">{infoWindow.name}</div>
                    <div className="infoWindow-address">{infoWindow.street}</div>
                    <div className="infoWindow-address">{infoWindow.location}</div>

                    {markers.indexOf(infoWindow) === -1 &&
                    <div className="infoWindow-add-container">
                        <input name="date" type="date" value={date} onChange={this.handleChange} />
                        <div className="infoWindow-add-button" onClick={() => addMarker(user.id, currentMarker, date, 'experiences')}>Add Experience</div>
                        <div className="infoWindow-add-button" onClick={() => addMarker(user.id, currentMarker, date, 'wishlist')}>Add Wish</div>
                    </div>}

                    {markers.includes(infoWindow) && 
                    <div>
                        <div className="infoWindow-date"> {infoWindow.date}</div>
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