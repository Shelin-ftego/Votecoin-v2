import React, {useState, useEffect, Component} from 'react';
import {Switch, Link, Redirect, useHistory} from 'react-router-dom';
import '../../App.css';
import Navbar from '../Navbar';
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CreateIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios'
//import Dropzone from 'react-dropzone';
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
NOTE: YOU CAN INIT WEB3 IN COMPONENT DID MOUNT AND AUTHORIZE THE VOTER IN 'handlesumbit'(create a function and call it there)
*/
  class Register extends Component{
  state = { ID: 0, name: 0, surname:0, province:undefined, municipality:undefined
          , ward:undefined, district:undefined, password:undefined, confirmi:undefined };
          submitVoter = async()=>{
            try{
              const registerstyle={
                color:'blue'
              };
              //add checks for all states to ensure that all fields have been filled out
              if(this.state.password!= this.state.confirmi){
                alert("Passwords do not match")
                throw new Error("Passwords do not match");
              }
              const newVoter = {
                  National_id : this.state.ID,
                  Name : this.state.name,
                  Surname : this.state.surname,
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
              alert("You are now registered")
              localStorage.setItem('token', response.data.token )
              //needs to transition
            }
            catch(e){
              console.log(e)
              alert("You could not be added")
            }
          }
  handleSubmit = event => {
    event.preventDefault()
    this.submitVoter()
    };
    
  
    paperStyle={padding :50,height:'115vh',width:400, margin:"20px auto"};
    avatarStyle={backgroundColor:'#1bbd7e'};
    btnstyle={margin:'8px 0', align:'middle'};

  render(){
  return(
    <div style={{
      backgroundImage:
        "url(" + require("./images/bg.png").default + ")", backgroundRepeat:'no-repeat', backgroundSize:'100% 100%'
    }}> 
    <Navbar/>
    <form onSubmit={this.handleSubmit}>
    <Paper elevation={10} style={this.paperStyle}>
    <Grid align='center'>
    <Avatar style={this.avatarStyle}><CreateIcon/></Avatar>
         <h2>Voter Registration</h2>
     </Grid>
     <h4> Please fill in the following information:</h4> 
        <div>
            <TextField label='ID' placeholder='Please enter identification number' required onChange={(e) => this.setState({ID:e.target.value})}/>
        </div>
        <div>
            <TextField label='Name' placeholder='Please enter First Name' required onChange={(e) => this.setState({name:e.target.value})}/>
        </div>
        <div>
            <TextField label='Surname' placeholder='Please enter Surname' required onChange={(e) => this.setState({surname:e.target.value})}/>
        </div>
        <br/>
        <div>
          <h4>Address:</h4>
            <div>
                <TextField label='Province' placeholder='Please enter Province' required onChange={(e) => this.setState({province:e.target.value})}/>
            </div>
            <div>
                <TextField label='Municipality' placeholder='Please enter Municipality' required onChange={(e) => this.setState({municipality:e.target.value})}/>
            </div>
            <div>
                <TextField label='Ward' placeholder='Please enter Ward' required onChange={(e) => this.setState({ward:e.target.value})}/>
            </div>
            <div>
                <TextField label='Distinct' placeholder='Distinct' required onChange={(e) => this.setState({district:e.target.value})}/>
            </div>
        </div>
        <h4>Password:</h4>
        <div>
              <TextField label='Password' placeholder='Please enter password' type='password' required onChange={(e) => this.setState({password:e.target.value})}/>
        </div>
        <div>
              <TextField label='Confirm Password' placeholder='Please enter Confirm password' type='password' required onChange={(e) => this.setState({confirmi:e.target.value})}/>    
        </div>
        <Grid align='center'>
          <Button type='submit' color='inherit' variant="contained" style={this.btnstyle} align='center'>Register</Button>
        </Grid>
       </Paper>
      </form>
    </div>);
  }
}

export default Register



