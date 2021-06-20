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
  state = { party: undefined, c_image:null , web3: null, accounts: null, contract: null, status: null };

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
    const { accounts, contract } = this.state;

    // check the election status on smart contract
    const response = await contract.methods.isVotingOpen().call();

    // update state with status of election
    if (response === true){
        this.setState({ status: true });
    }else{
        this.setState({ status: false });
    }    
  };

  // add candidate onto blockchain function
  runExample = async () => {
    try{
      if(this.state.party==undefined || this.state.c_image==null){
        throw new Error("Candidate details are not complete")
      }
      const { accounts, contract } = this.state;
      await contract.methods.addCandidate(this.state.party).send({ from: accounts[0] });
    }
    catch(e){
      console.log(e)
    }

    // index to get the last candidate in array
    // var index = await contract.methods.getNumofCandidates().call();
    // console.log(index);

    // getCandidate is a method which returns 3 values, by default these get stored in an array
    // var response = await contract.methods.getCandidate((index-1)).call();
    // console.log(response[0]);
    // console.log(response[1]);
    // console.log(response[2]);
  };

   handleSubmit = (event) => {
     if(!this.state.status){ // if election is closed
      this.submitCandidate()
      this.runExample()
     }
    };

    submitCandidate = async()=>{
      try{
        if(this.state.party == undefined){
          alert("Provide the name of the candidate's political party ")
          throw new Error("Candidate can not be added")
        }
        if(this.state.c_image == null){
          alert("Provide and image for the new candidate ")
          throw new Error("Candidate can not be added")
        }
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
  
        await axios.post('/admin/election-admin/candidate', JSON.stringify(newCandidate), config1)
        const candidate_img = new FormData()
        candidate_img.append('image', this.state.c_image, this.state.c_image.name)
        await axios.post(`/admin/election-admin/${this.state.party}/image`, candidate_img, config2)
        if(!window.confirm("Are you sure you want to add this candidate?")){
          throw new Error("Rejected candidate")
        }
          //need to do a page transition
      }
      catch(e){
        console.log(e)
        alert("Candidate could not be added")
      }
    }

  render(){
    
    // if web3 is not connected, this page is displayed
    //if (!this.state.web3) {
    //  return <div>Loading Web3, accounts, and contract...</div>;
    //}
            
    return(
      <div style={{
        backgroundImage:
          "url(" + require("./bg.png").default + ")", backgroundRepeat:'no-repeat', backgroundSize:'100% 100%'
      }}> 
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
               <input type='file' id='image' onChange={(e)=> this.setState({c_image:e.target.files[0]}) }/>
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





  
