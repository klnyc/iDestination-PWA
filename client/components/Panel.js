import React from 'react'
import { connect } from 'react-redux'

class Panel extends React.Component {
    render() {
        const { panel, markers } = this.props
        const experiences = markers.filter(marker => marker.experiences)
        const wishlist = markers.filter(marker => marker.wishlist)
        return (
            <div className={(panel.experiences || panel.wishlist) ? "panel" : "invisible"}>
                <div className="panel-title">{panel.experiences ? "Experiences" : "Wishlist"}</div>
                <div>
                    {markers
                    .filter(marker => {
                        return panel.experiences ? marker.experiences : panel.wishlist
                    })
                    .map(marker => <div className="panel-name">{marker.name}</div>)}
                </div>
            </div>
        )
    }
}

const mapState = (state) => ({
    markers: state.markers,
    panel: state.panel
})

const mapDispatch = (dispatch) => ({
    
})

export default connect(mapState, null)(Panel)