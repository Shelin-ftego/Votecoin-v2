import React, {useState, useEffect} from 'react'
import Modal from 'react-modal';
import axios from 'axios'

const Candidate_view = function (props){
    const [image, setImage] = useState(null)
    const [openmodal, togglemodal] = useState(false)

    return(
        <div>
             <h3>PartyName: {props.PartyName} Name: {props.Name} Surname: {props.Surname}</h3>
        </div>
    )
}

export default Candidate_view
