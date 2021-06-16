import React, {useState, useEffect} from 'react';
import {Switch, Link, Redirect, useHistory} from 'react-router-dom';
import '../../App.css';
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import Footer from '../Footer';
import axios from 'axios';
import NavbarA from '../NavbarA';
//import Dropzone from 'react-dropzone';


function AddCandidate() {
  const history = useHistory();
  const [party,setParty] = useState()
  const [name,setName] = useState()
  const [surname,setSurname] = useState()
  const [age,setAge] = useState()
  const [image,setImage] = useState()
  const registerstyle={
    color:'blue'
  };

  const handleSubmit = event => {
    event.preventDefault()
    submitCandidate()
    };

  const submitCandidate = async()=>{
    try{
      const newCandidate = {
          Political_party : {party}.party,
          Name : {name}.name,
          Surname : {surname}.surname,
          Age : {age}.age,
      }
      const token = localStorage.getItem('token')
      const config1 ={
        headers:{
          "Content-type": "application/json",
          "Authorization": "Bearer "+ token
        }
      }
      const config2 ={
        headers:{
          "Content-type": "multipart/form-data",
          "Authorization": "Bearer "+ token
        }
      }

      const candidate =new FormData()
      // candidate.append("Political_Party", {party}.party)
      // candidate.append("Name", {name}.name)
      // candidate.append("Surname", {surname}.surname)
      // candidate.append("Age", {age}.age)
      candidate.append('image', {image}.image, {image}.image.name)

      const response = await axios.post('/admin/election-admin/candidate', JSON.stringify(newCandidate), config1)
      history.push('/admin')
    }
    catch(e){
      console.log(e)
    }
  }
  



  return(
    <div> 
    <NavbarA/>
    <form onSubmit={handleSubmit}>
      <h1>Candidate:</h1>
      <div>
        <h3>Political Party</h3>
          <input type="text" onChange={(e) => setParty(e.target.value)}/>
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
          <label>Upload Image(PNG): </label>
          <input type='file' id='image' onChange={(e)=>setImage(e.target.files[0])}/>
      </div>
      <Button type='submit' color='inherit' variant="contained" fullWidth >Add Candidate</Button>
    </form>

     
  <Footer/>
  </div>)
}
export default AddCandidate