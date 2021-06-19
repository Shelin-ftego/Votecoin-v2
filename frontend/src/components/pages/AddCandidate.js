import React, {useState, useEffect, Component} from 'react';
import {Switch, Link, Redirect, useHistory} from 'react-router-dom';
import '../../App.css';
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import Footer from '../Footer';
import axios from 'axios';
import NavbarA from '../NavbarA';
//import Dropzone from 'react-dropzone';

///////////////////////////////////////////////////////////////////
/*
make a web3 setup funciton and add the candidate using submitCandidate or call in handlesubmit
*/

class AddCandidate extends Component{
  state = { party: undefined};

   handleSubmit = event => {
    event.preventDefault()
    this.submitCandidate()
    };

   submitCandidate = async()=>{
    try{
      const newCandidate = {
          Political_party : this.state.party
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

      const response = await axios.post('/admin/election-admin/candidate', JSON.stringify(newCandidate), config1)
      //need to do a page transition
    }
    catch(e){
      console.log(e)
    }
  }
  render(){
    return(
      <div> 
      <NavbarA/>
      <form onSubmit={this.handleSubmit}>
        <h1>Candidate:</h1>
        <div>
          <h2>Political Party</h2>
            <input type="text" onChange={(e) =>  this.setState({party:e.target.value})}/>
        </div>
        <Button type='submit' color='inherit' variant="contained" fullWidth >Add Candidate</Button>
      </form>
    <Footer/>
    </div>)
  }
}
export default AddCandidate