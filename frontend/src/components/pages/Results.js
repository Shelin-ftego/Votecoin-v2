import { Divider } from "@material-ui/core";
import React, { Component } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NavbarV from '../NavbarV';

// web3 imports
import ElectionContract from "../../contracts/Election.json";
import getWeb3 from "../../getWeb3";


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
  
//const classes = useStyles();


class Results extends Component{

  // states + web3 states
  state = { winner: undefined, status: undefined, results: undefined, web3: null, accounts: null, contract: null, status: null, statusDisplay: null };

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
      this.setState({ web3, accounts, contract: instance }, this.fetchResults);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  // get results from blockchain
  fetchResults = async () => {

    if (!this.state.status){ // if election is closed
      const { contract } = this.state;
    
      // check the election status on smart contract
      const responseStatus = await contract.methods.isVotingOpen().call();
  
      // update state with status of election
      if (responseStatus === true){
        this.setState({ status: true });
        this.setState({statusDisplay: "OPEN"});
        console.log('election: open');
      }else{
        this.setState({ status: false });
        this.setState({statusDisplay: "CLOSED"});
        console.log('election: closed');
      } 
  
      const totalVotes = await contract.methods.totalVotes().call(); // get total votes
      console.log('total votes: ' , totalVotes)
  
      // index to get the last candidate in array
      var index = (await contract.methods.getNumofCandidates().call()) - 1;
      console.log(index);
  
      if (!this.state.status){ // if election is closed
        if (index>=0){
          const winnerObj = await contract.methods.getWinnerCandidate().call(); // first get winner candidate
          this.setState({ winner: winnerObj[1] });
          console.log('winner:' , this.state.winner);
          

          for (var i=0; i<=index; i++){
            const candidate = await contract.methods.getCandidate(i).call(); // getCandidate is a method which returns 3 values, by default these get stored in an array, so "response" is an array
            // store candidate[1] into table // party name
            // store candidate[2] into table // votes received
            const votesPercent = candidate[2]/totalVotes * 100 // % of votes received
      }
        }
      }
      
    }
  }; 

  render(){
    
    // if web3 is not connected, this page is displayed
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }    

    // return election results not available when status == true
    if(this.state.status === true){
      return(<div>Election is currently open, results unavailable</div>)
    }

    return (
      <div style={{
        backgroundImage:
          "url(" + require("./images/bg.png").default + ")", backgroundRepeat:'no-repeat', backgroundSize:'100% 100%'
      }}>
          <NavbarV/>
          <div align='center'>Election Status: {this.state.statusDisplay}</div>
        <h1 align='center'>Results</h1>
      <h1 align='center'>WINNER: {this.state.winner}</h1>
      </div>
  )
}
};

export default Results;