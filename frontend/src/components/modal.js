import React, {useState, useEffect} from 'react'
import './modal.css'

function modal(props) {

    return (props.trigger)?(
        <div className="modal">
            <div className="modal-inner">
                <button className="close-btn" onClick={()=>{props.setTrigger(false)}}>
                    close
                </button>
                {props.children}
            </div>
        </div>
    ): "";
}

export default modal