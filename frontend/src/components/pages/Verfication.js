import React, {Component} from 'react';
import NavbarV from '../NavbarV';  
import { Grid,Paper, Avatar, TextField, Button} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// web3 imports
import ElectionContract from "../../contracts/Election.json";
import getWeb3 from "../../getWeb3";

const paperStyle={padding :20,height:'90vh',width:800, margin:"20px auto"}
const avatarStyle={backgroundColor:'#1bbd7e'}
const btnstyle={margin:'8px 0'}

class Verfication extends Component{
    // states + web3 states
    state = { ethAddress: undefined, candidateVoted:undefined, web3: null, accounts: null, contract: null, status: null}

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

  handleSubmit = (event) => {
    this.verify();
  };

  verify = async () => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.verifyVote(this.state.ethAddress).call();
    this.setState({candidateVoted: response});

    console.log('test123');
    console.log(this.state.ethAddress);
  };

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
            
            <Grid>
            <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                   <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
               <h2>Verify Your Vote</h2>
              </Grid>
              <Grid align='center'>
            <TextField label='Voter Address' placeholder='Please Enter Voter Address' onChange={(e) => this.setState({ethAddress:e.target.value})}/>
            <br/>
            <br/>
            <Button style={btnstyle} type='submit' color='primary' variant="contained" >Check Voter Address</Button>
            <br/>
            <TextField label='Candidate Voted' placeholder='Candidate Voted'>{this.state.candidateVoted}</TextField>
            <br/>
            </Grid>
            </Paper>
            </Grid>
        </div>
    )
    }
}

export default Verfication

