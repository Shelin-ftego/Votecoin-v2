import React, {useState, useEffect} from 'react'

const Voterroll_view = function (props){

    return(
        <div>
            <h1>ID: {props.ID} Name: {props.Name} Surname: {props.Surname} </h1>
            <h2>Province: {props.Province} Municipality:{props.Municipality} Ward:{props.Ward} District:{props.District}</h2>
            <h3>Registered:{props.Reg.toString()} Voted:{props.Voted.toString()}</h3> 
            <br>
            </br>
            <br>
            </br>
        </div>
    )
}

export default Voterroll_view
