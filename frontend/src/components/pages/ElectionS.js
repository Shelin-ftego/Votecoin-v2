import React, { Component } from 'react';
import NavbarA from '../NavbarA';
import { Grid,Paper, Avatar, Button, Typography } from '@material-ui/core'
import ThumbUpIcon from '@material-ui/icons/ThumbUpOutlined';

// web3 imports
import ElectionContract from "../../contracts/Election.json";
import getWeb3 from "../../getWeb3";

const paperStyle={padding :20,height:'70vh',width:700, margin:"20px auto"};
const avatarStyle={backgroundColor:'#1bbd7e'};
const btnstyle={margin:'15px 0',font: '20px',padding: '10px 60px',border: '20px'};

class ElectionS extends Component{

    // states + web3 states
    state = { web3: null, accounts: null, contract: null, status: null, statusDisplay: null };

    // web3 initialization
    componentDidMount = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();
    
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts()

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

      // starts election on smart contract
      start = async () => {
        const { accounts, contract } = this.state;
        await contract.methods.startElection().send({ from: accounts[0] });
      };

      // stops election on smart contract
      stop = async () => {
        const { accounts, contract } = this.state;
        await contract.methods.endElection().send({ from: accounts[0] });
      };

    handleStartSubmit = event => {
        this.start() // call start function
        console.log("start election")
        };

    handleStopSubmit = event => {
        this.stop() // call stop function
        console.log("stop election")
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
            <NavbarA/>
            <div align='center'>Election Status: {this.state.statusDisplay}</div>
            <Grid>
            <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                        <Avatar style={avatarStyle}><ThumbUpIcon/></Avatar>
                        <h1 align='center'>VOTING STATUS: {this.state.statusDisplay}</h1>
            </Grid>
        <Grid align='center'>
        <Button align='left' type='submit' color='primary' variant="contained" style={btnstyle} onClick={this.handleStartSubmit}>Start Voting Period</Button>
        </Grid>
        <br/>
        <Grid align='center'>
        <Button alight='right' type='submit' color='primary' variant="contained" style={btnstyle} onClick={this.handleStopSubmit}>End Voting Period</Button>
        </Grid>
        <br/>
        <Typography align='center'> 
             Admin may START or STOP the Voting Period
                    </Typography>
         <br/>        
            </Paper>
            </Grid>
            {' '}
            <br/>
            {' '}
            <br/>
            {' '}
            <br/>
            {' '}
            <br/>
            {' '}
            <br/>
            {' '}
            <br/>
        </div>
    )
    }

}

export default ElectionS