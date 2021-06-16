import React, {useState, useEffect} from 'react';
import {Switch, Link, Redirect, useHistory} from 'react-router-dom';
import '../../App.css';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios'
//import Dropzone from 'react-dropzone';

  function Register() {
  const history = useHistory();
  const registerstyle={
    color:'blue'
  };
  const [ID,setID] = useState()
  const [name,setName] = useState()
  const [surname,setSurname] = useState()
  const [age,setAge] = useState()
  const [dob,setdob] = useState()
  const [province,setProvince] = useState()
  const [municipality,setMunicipality] = useState()
  const [ward,setWard] = useState()
  const [district,setDistrict] = useState()
  const [password,setPassword] = useState()
  const [confrim,setConfirm] = useState()
  const handleSubmit = event => {
    event.preventDefault()
    submitVoter()
    //submitImageID()
    
    };
    
  const submitVoter = async()=>{
    try{
      //console.log({idimage}.idimage)
      //add checks for all states to ensure that all fields have been filled out
      if({password}.password!={confrim}.confrim){
        throw new Error("Passwords do not match");
      }
      const newVoter = {
          National_id : {ID}.ID,
          Name : {name}.name,
          Surname : {surname}.surname,
          Age : {age}.age,
          Date_of_Birth : {dob}.dob,
          Address : {
              Province : {province}.province,
              Municipality : {municipality}.municipality,
              Ward : {ward}.ward,
              District : {district}.district,
          },
          Password : {password}.password  
      }
      const config1 ={
        headers:{
          "Content-type": "application/json",
        }
      }
      const response = await axios.post('/voter/register', JSON.stringify(newVoter), config1)
      localStorage.setItem('token', response.data.token )
      console.log(localStorage.getItem('token'))
      history.push('/')
    }
    catch(e){
      console.log(e)
    }
  }
  


  return(
   <div> 
   <Navbar/>
   <form onSubmit={handleSubmit}>
      <div>
        <h3>ID Number</h3>
          <input type="text" onChange={(e) => setID(e.target.value)}/>
      </div>
      <div>
        <h3>Name</h3>
          <input type="text" onChange={(e) => setName(e.target.value)}/>
      </div>
      <div>
        <h3>Surname</h3>
          <input type="text" onChange={(e) => setSurname(e.target.value)}/>
      </div>
      <div>
        <h3>Age</h3>
          <input type="text" onChange={(e) => setAge(e.target.value)}/>
      </div>
      <div>
        <h3>Date of Birth(YYYY/MM/DD)</h3>
          <input type="text" onChange={(e) => setdob(e.target.value)}/>
      </div>
      <div>
        <h2>Address</h2>
          <div>
            <h3>Province</h3>
              <input type="text" onChange={(e) => setProvince(e.target.value)}/>
          </div>
          <div>
            <h3>Municipality</h3>
              <input type="text" onChange={(e) => setMunicipality(e.target.value)}/>
          </div>
          <div>
            <h3>Ward</h3>
              <input type="text" onChange={(e) => setWard(e.target.value)}/>
          </div>
          <div>
            <h3>Distinct</h3>
              <input type="text" onChange={(e) => setDistrict(e.target.value)}/>
          </div>
      </div>
      <div>
          <h3>Password</h3>
            <input type="password" onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <div>
          <h3>Confirmed Password</h3>
            <input type="password" onChange={(e) => setConfirm(e.target.value)}/>
      
      {/*<h3>Document uploads</h3>*/}
        {/*<label>Upload ID(PNG): </label>
        <input type='file'onChange={(e)=>setImage(e.target.files[0])}/>
        <label>Upload Selfie(PNG): </label>
        <input type='file'onChange={(e)=>setSelfie(e.target.files[0])}/>
        <Link to='/upload'>
        <Button type='submit' color='inherit' variant="contained" >Upload Images</Button>
         </Link> */}     
      </div>
      <Button type='submit' color='inherit' variant="contained" fullWidth >Register</Button>
    </form>
  <Footer/>
  </div>);
}

export default Register