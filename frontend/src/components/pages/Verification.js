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

class Verification extends Component{
    // states + web3 states
    state = { ethAddress: undefined, candidateVoted:undefined, web3: null, accounts: null, contract: null, status: null, statusDisplay: null}

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
        this.setState({ statusDisplay: "OPEN" });
        console.log('election: open');
    }else{
        this.setState({ status: false });
        this.setState({ statusDisplay: "CLOSED" });
        console.log('election: closed');
    }    
  };  

  // verify a vote
  verify = async () => {
    const { contract } = this.state;
    const cVoted = await contract.methods.verifyVote(this.state.ethAddress).call(); 
    console.log('candidate voted: ', cVoted);
    this.setState({candidateVoted: cVoted});
  };

  handleSubmit = (event) => {
      this.verify();
  };  

    render(){

    // if web3 is not connected, this page is displayed
   if (!this.state.web3) {
   return <div>Loading Web3, accounts, and contract...</div>;
    }

    return (
        <div style={{
          backgroundImage:
            "url(" + require("./images/bg.png").default + ")", backgroundRepeat:'no-repeat', backgroundSize:'100% 100%'
        }}>
            <NavbarV/>
            <div align='center'>Election Status: {this.state.statusDisplay}</div>
            
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
            <Button style={btnstyle} type='submit' color='primary' variant="contained" onClick={this.handleSubmit} >Check Voter Address</Button>
            <br/>
            <br/>
            <div> Candidate Voted: {this.state.candidateVoted} </div>
            <br/>
            </Grid>
            </Paper>
            </Grid>
        </div>
        
    )
    }
}

export default Verification;