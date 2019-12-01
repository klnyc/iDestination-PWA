import React from 'react'
import Header from './header'
import Nav from './nav'
import Map from './map'
import Login from './login'

export default () => {
    return (
        <div id="main">
            <Header />
            <Map />
            <Login />
            <Nav />
        </div>
    )
}

