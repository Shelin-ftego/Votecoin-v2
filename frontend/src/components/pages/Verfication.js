import React, {useState} from 'react';
import NavbarV from '../NavbarV';  


function Verfication() {
    const [data,setData] = useState(null);
    const [print,setPrint] = useState(null);



  function getData(val)
 {
     setData(val.target.value)
     console.warn(val.target.value)
 } 

    return (
        <div>
            <NavbarV/>
            {
                print?
                <h1>{data}</h1>
                :null
            }
            <h1>{data}</h1>
            <input type="text" onChange={getData}/>
            <br/>
            <br/>
            <button onClick={()=>setPrint(true)} >Check Voter number: </button>
        </div>
    )
}

export default Verfication
