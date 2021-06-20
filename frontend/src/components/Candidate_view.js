import React, {useState, useEffect, Component} from 'react';
import {Switch, Link, Redirect, useHistory} from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";

// web3 imports
import ElectionContract from "../contracts/Election.json";
import getWeb3 from "../getWeb3";

// Card design 
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const paperStyle={padding :20,height:'150vh',width:800, margin:"20px auto"};
const avatarStyle={backgroundColor:'#1bbd7e'};
const btnstyle={margin:'8px 0'};

//web3 can be called in the vote function; the candidate index is 'idx'

class Candidate_view extends Component{

    // states + web3 states
    state = { party: undefined, image:undefined, web3: null, accounts: null, contract: null, status: null };
  // web3 initialization
  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = ElectionContract.networks[networkId];
      const instance = new web3.eth.Contract(
        ElectionContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      console.log(networkId);
      console.log(deployedNetwork.address);
      console.log(ElectionContract.abi);
      
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };


Vote = async(idx)=>{
  try{
    if(!window.confirm("Confirm this vote \n (Submitted votes cannot be changed)")){
      throw new Error("Vote rejected")
    }
    const token = localStorage.getItem('token')
    const config ={
      headers:{
        "Content-type": "multipart/form-data",
        "Authorization": "Bearer "+ token
      }
    }
    const response = await axios.patch('/voter/vote',{}, config)
    console.log("voted for "+idx)

    // call function from smart contract to vote
    const { accounts, contract } = this.state;
    await contract.methods.vote(idx).send({ from: accounts[0] });
    
  }
  catch(e){
    alert("Vote was not processed")
  }
}

  render(){
    return(
      <div>  
     <Grid>
       <Paper elevation={10} style={paperStyle}>
       <Grid align='center'>
        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
        <h1>Please Vote For A Candidate</h1>
    </Grid>
          <Grid align='center'>
          <div>
            <MDBCardTitle>Candidate: {this.props.PartyName}</MDBCardTitle>
            <img src={`http://localhost:4000/voter/candidate/${this.props.PartyName}/image`}></img>
          </div>
            <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={this.Vote.bind(this,  this.props.Cand_index)}>Vote</Button>
          </Grid>
        </Paper>
    </Grid>
    </div>
    )
    }
}

export default Candidate_view


