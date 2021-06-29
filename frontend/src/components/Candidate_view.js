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

const paperStyle={padding :20,height:'40vh',width:200, margin:"20px auto"};
const avatarStyle={backgroundColor:'#1bbd7e'};
const btnstyle={margin:'8px 0'};


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

      // print contract address
      console.log('contract address: ', deployedNetwork.address);
      
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.fetchStatus);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

    // fetch election status
    fetchStatus = async () => {
      const { contract } = this.state;
  
      // check the election status on smart contract
      const response = await contract.methods.isVotingOpen().call();
  
      // update state with status of election
      if (response === true){
          this.setState({ status: true });
          console.log('election: open');
      }else{
          this.setState({ status: false });
          console.log('election: closed');
      }    
    };

Vote = async(idx)=>{
  // test on console
  const { contract } = this.state;
  const test = await contract.methods.getCandidate(idx).call();
  console.log('frontend: ', idx); // return candidate index
  console.log('blockchain: ', test[1]); // return candidate name

  if (this.state.status){ // if election is open
    try{
      if(!window.confirm("Confirm this vote \n (Submitted votes cannot be changed)")){
        throw new Error("Vote rejected")
      }

      // call "vote" function from smart contract
      const { accounts, contract } = this.state;
      await contract.methods.vote(idx).send({ from: accounts[0] });
      console.log('voted on blockchain')

      const token = localStorage.getItem('token')
      const config ={
        headers:{
          "Content-type": "multipart/form-data",
          "Authorization": "Bearer "+ token
        }
      }
      const response = await axios.patch('/voter/vote',{}, config) // "const response" can be deleted ????????????
      console.log("voted for "+idx)
    }
    catch(e){
      alert("Vote was not processed")
    }
  }else{
    alert("Voting Period Currently Closed");
  }
}

  render(){
    return(
      <div>  
     <Grid>
       <Paper elevation={10} style={paperStyle}>
       <Grid align='center'>
        <h3>Party: {this.props.PartyName}</h3>
    </Grid>
          <Grid align='center'>
          <div>
            <img src={`http://localhost:4000/voter/candidate/${this.props.PartyName}/image`} width="150" height="150"></img>
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