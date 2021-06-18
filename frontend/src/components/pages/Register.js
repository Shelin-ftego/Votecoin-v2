import React, {useState, useEffect, Component} from 'react';
import {Switch, Link, Redirect, useHistory} from 'react-router-dom';
import '../../App.css';
import Footer from '../Footer';
import Navbar from '../Navbar';
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios'
//import Dropzone from 'react-dropzone';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
NOTE: YOU CAN INIT WEB3 IN COMPONENT DID MOUNT AND AUTHORIZE THE VOTER IN 'handlesumbit'(create a function and call it there)
*/
  class Register extends Component{
  state = { ID: 0, name: 0, surname:0, age:0, dob:0, province:undefined, municipality:undefined
          , ward:undefined, district:undefined, password:undefined, confirmi:undefined };
          submitVoter = async()=>{
            try{
              const registerstyle={
                color:'blue'
              };
              //add checks for all states to ensure that all fields have been filled out
              if(this.state.password!= this.state.confirmi){
                throw new Error("Passwords do not match");
              }
              const newVoter = {
                  National_id : this.state.ID,
                  Name : this.state.name,
                  Surname : this.state.surname,
                  Age : this.state.age,
                  Date_of_Birth : this.state.dob,
                  Address : {
                      Province : this.state.province,
                      Municipality : this.state.municipality,
                      Ward : this.state.ward,
                      District : this.state.district,
                  },
                  Password : this.state.password 
              }
              const config1 ={
                headers:{
                  "Content-type": "application/json",
                }
              }
              const response = await axios.post('/voter/register', JSON.stringify(newVoter), config1)
              localStorage.setItem('token', response.data.token )
              console.log(localStorage.getItem('token'))
            }
            catch(e){
              console.log(e)
            }
          }
  handleSubmit = event => {
  
    event.preventDefault()
    this.submitVoter()
    
    };
    
  
  

  render(){
  return(
    <div> 
    <Navbar/>
    <form onSubmit={this.handleSubmit}>
        <div>
          <h3>ID Number</h3>
            <input type="text" onChange={(e) => this.setState({ID:e.target.value})}/>
        </div>
        <div>
          <h3>Name</h3>
            <input type="text" onChange={(e) => this.setState({name:e.target.value})}/>
        </div>
        <div>
          <h3>Surname</h3>
            <input type="text" onChange={(e) => this.setState({surname:e.target.value})}/>
        </div>
        <div>
          <h3>Age</h3>
            <input type="text" onChange={(e) => this.setState({age:e.target.value})}/>
        </div>
        <div>
          <h3>Date of Birth(YYYY/MM/DD)</h3>
            <input type="text" onChange={(e) => this.setState({dob:e.target.value})}/>
        </div>
        <div>
          <h2>Address</h2>
            <div>
              <h3>Province</h3>
                <input type="text" onChange={(e) => this.setState({province:e.target.value})}/>
            </div>
            <div>
              <h3>Municipality</h3>
                <input type="text" onChange={(e) => this.setState({municipality:e.target.value})}/>
            </div>
            <div>
              <h3>Ward</h3>
                <input type="text" onChange={(e) => this.setState({ward:e.target.value})}/>
            </div>
            <div>
              <h3>Distinct</h3>
                <input type="text" onChange={(e) => this.setState({district:e.target.value})}/>
            </div>
        </div>
        <div>
            <h3>Password</h3>
              <input type="password" onChange={(e) => this.setState({password:e.target.value})}/>
        </div>
        <div>
            <h3>Confirmed Password</h3>
              <input type="password" onChange={(e) => this.setState({confirmi:e.target.value})}/>    
        </div>
          <Button type='submit' color='inherit' variant="contained" fullWidth >Register</Button>
      </form>
    <Footer/>
    </div>);
  }
}

export default Register