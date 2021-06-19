import React, {useState, useEffect, Component} from 'react';
import {Switch, Link, Redirect, useHistory} from 'react-router-dom';
import '../../App.css';
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import Footer from '../Footer';
import axios from 'axios';
import NavbarA from '../NavbarA';
import GroupIcon from '@material-ui/icons/GroupOutlined';

//import Dropzone from 'react-dropzone';

// web3 imports
import ElectionContract from "../../contracts/Election.json";
import getWeb3 from "../../getWeb3";

const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
const avatarStyle={backgroundColor:'#1bbd7e'}
const btnstyle={margin:'8px 0'}


class AddCandidate extends Component{
  // states + web3 states
  state = { party: undefined, name: undefined, surname:undefined, age:undefined, web3: null, accounts: null, contract: null };

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

  // add candidate onto blockchain function
  runExample = async () => {
    const { accounts, contract } = this.state;
    await contract.methods.addCandidate(this.state.party).send({ from: accounts[0] });

    // index to get the last candidate in array
    // var index = await contract.methods.getNumofCandidates().call();
    // console.log(index);

    // getCandidate is a method which returns 3 values, by default these get stored in an array
    // var response = await contract.methods.getCandidate((index-1)).call();
    // console.log(response[0]);
    // console.log(response[1]);
    // console.log(response[2]);
  };

   handleSubmit = event => {
    event.preventDefault()
    this.submitCandidate()
    this.runExample()
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
      <Grid> 
        <h1 align='center'>Add New Candidates:</h1>

        <Paper elevation={10} style={paperStyle}>
    <Grid align='center'>
        <Avatar style={avatarStyle}><GroupIcon/></Avatar>
        <h2>Political Party</h2>
    </Grid>
     <Grid>
     <TextField label='Party Name' placeholder='Please enter Party Name' onChange={(e) =>  this.setState({party:e.target.value})}/>
             <br/>
     </Grid>
            <br/>
    <Grid>            <label>Select Image to Upload: </label>
               <input type='file' name='file'/>
               <br/>
               </Grid>
         <br/>
        <Button style={btnstyle} type='submit' color='inherit' variant="contained" fullWidth >Add Candidate</Button>
        </Paper>
        </Grid>
      </form>
    <Footer/>
    </div>)
  }
}
export default AddCandidate





  
