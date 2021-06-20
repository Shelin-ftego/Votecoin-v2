import React, {useState, Component} from 'react';
import NavbarV from '../NavbarV';  
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// web3 imports
import ElectionContract from "../../contracts/Election.json";
import getWeb3 from "../../getWeb3";

const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
const avatarStyle={backgroundColor:'#1bbd7e'}
const btnstyle={margin:'8px 0'}

class Verfication extends Component{
    // states + web3 states
    state = { data:undefined, print:undefined, ethAddress: undefined, candidateVoted:undefined, web3: null, accounts: null, contract: null, status: null}

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

  verify = async () => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.verifyVote(this.state.ethAddress).call();
    this.setState({candidateVoted: response});
  };

    getData(val)
    {
        this.setState({data:val})
        console.warn(val.target.value)
        this.verify();
    } 

    render(){

    // if web3 is not connected, this page is displayed
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
        <div style={{
          backgroundImage:
            "url(" + require("./bg.png").default + ")",
        }}>
            <NavbarV/>
            {
                this.state.print?
                <h1>{this.state.data}</h1>
                :null
            }
            <h1>{this.state.data}</h1>
            <Grid>
            <Paper elevation={10} style={this.paperStyle}>
            <Grid align='center'>
                   <Avatar style={this.avatarStyle}><LockOutlinedIcon/></Avatar>
               <h2>Check Registration:</h2>
              </Grid>
            <TextField label='Voter Address:' placeholder='Please Enter Voter Address:' /*onChange={this.setState({data:'what is this for'})}*//>
            <br/>
            <br/>
            <Button type='submit' color='primary' variant="contained" onClick={()=>this.setState({print:true})} style={btnstyle}>Check Voter Address</Button>
            <TextField >{this.state.candidateVoted}</TextField>
            </Paper>
            </Grid>
        </div>
    )
    }
}

export default Verfication

