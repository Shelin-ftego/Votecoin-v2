import React, {useState, useEffect, Component} from 'react';
import {Switch, Link, Redirect, useHistory} from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";

//WEB 3 can be called in the vote function; the candidate index is 'idx'
class Candidate_view extends Component{

Vote = async(idx)=>{
  try{
    const token = localStorage.getItem('token')
    const config ={
      headers:{
        "Content-type": "multipart/form-data",
        "Authorization": "Bearer "+ token
      }
    }
    const response = await axios.patch('/voter/vote',{}, config)
    console.log("voted for "+idx)
    
  }
  catch(e){

  }
}
  render(){
    return(
      <div>
      <MDBContainer>
        <MDBCard>
        <MDBCardBody>
            <MDBCardTitle>Candidate: {this.props.PartyName}</MDBCardTitle>
            <button onClick={this.Vote.bind(this,  this.props.Cand_index)}>Vote</button>
          </MDBCardBody>
        </MDBCard>
    </MDBContainer>
    </div>
    )
    }
}

export default Candidate_view

