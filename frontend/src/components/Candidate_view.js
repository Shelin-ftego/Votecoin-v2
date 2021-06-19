import React, {useState, useEffect, Component} from 'react';
import {Switch, Link, Redirect, useHistory} from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";

// web3 imports
import ElectionContract from "../contracts/Election.json";
import getWeb3 from "../getWeb3";

//WEB 3 can be called in the vote function; the candidate index is 'idx'

class Candidate_view extends Component{

    // states + web3 states
    state = { party: undefined, web3: null, accounts: null, contract: null };

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

