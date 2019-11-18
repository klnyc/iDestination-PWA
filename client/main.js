import React from 'react'
import Header from './header'
import Nav from './nav'
import Map from './map'

export default () => {
    return (
        <div id="main">
            <Header />
            <Map />
            <Nav />
        </div>
    )
}

