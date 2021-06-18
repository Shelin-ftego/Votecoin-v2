import React, {useState, useEffect, Component} from 'react';
import NavbarA from '../NavbarA';

//WEB3 still needs to go here
//initialization for web3

class ElectionS extends Component{
    //states still need to be defined
    handleStartSubmit = event => {
        console.log("start")
        event.preventDefault()
        //call web 3
        };

    handleStopSubmit = event => {
        event.preventDefault()
        console.log("stop")
        //call web3
        };

    render(){
    return (
        <div>
            <NavbarA/>
        <h1> VOTING STATUS: </h1>
        <button onClick={this.handleStartSubmit}>Start Voitng Period</button>
        <button onClick={this.handleStopSubmit}>End Voting Period</button>
        </div>
    )
    }

}

export default ElectionS
