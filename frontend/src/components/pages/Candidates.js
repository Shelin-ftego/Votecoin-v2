import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import NavbarA from '../NavbarA';

//////////////////////////////USE ADDCANDIDATES PAGE INSTEAD
function Candidates() {
    const [print,setPrint] = useState(null);
    const [data,setData] = useState(null);
    function getData(val)
    {
        setData(val.target.value)
        console.warn(val.target.value)
    }
    return (
        <div>
            <NavbarA/>
            <h1>Candidates:</h1>
            <h1>Name:</h1>
            <input type="text" onChange={getData}/>
            <h1>ID Number:</h1>
            <input type="text" onChange={getData}/>
            <h1>Password:</h1>
            <input type="text" onChange={getData}/>
            <div className=''>
               <label>Select Image to Upload: </label>
               <input type='file' name='file'/>
             </div>
            <br>
            
            
            </br>
            <Link to='/blockchain'>
            <button>Add Candidates</button>
            </Link>
        </div>
    )
}

export default Candidates
