import React, {useState, useEffect, Component} from 'react';
import {Switch, Link, Redirect, useHistory} from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";


class Candidate_view extends Component{
 
  render(){
   return(
    <div>
    <MDBContainer>
  <MDBCard>
   <MDBCardBody>
   <MDBCardTitle>Your Party is :{this.props.PartyName}</MDBCardTitle>
   <MDBCardTitle>
   Person name : {this.props.Name}
      </MDBCardTitle>
      <button>Vote</button>
      </MDBCardBody>
  </MDBCard>
</MDBContainer>
   </div>
   )
  }
}

export default Candidate_view

