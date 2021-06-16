import React, {useState, useEffect} from 'react';
import NavbarA from '../NavbarA';


function ElectionS() {
    const [print,setPrint] = useState(null);

    return (
        <div>
            <NavbarA/>
        <h1> CURRENT VOTING STATUS: </h1>
        <button onClick={()=>setPrint(true)}>Start Voitng Period</button>
        <button onClick={()=>setPrint(false)}>End Voting Period</button>
        </div>
    )
}

export default ElectionS
