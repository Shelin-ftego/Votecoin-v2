import React from 'react'
import Footer from '../Footer'
import NavbarV from '../NavbarV'

function Voter() {
    return (
        <div>
            <NavbarV/>
            <br/>
            <h1>Welcome Voter</h1>
            <h1>Here you are able to: </h1>
            <h1>⚫Vote</h1>
            <h1>⚫Vefiy if your vote has been cast</h1>
            <h1>⚫View Results when available</h1>
            <h1>⚫Upload required documents</h1>
            <br/>
            <Footer/>
        </div>
    )
}

export default Voter