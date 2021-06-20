import { Divider } from "@material-ui/core";
import React, { useEffect, useState, Component } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import NavbarV from '../NavbarV';
//import axios from "axios";
//import { HorizontalBar } from "@reactchartjs/react-chart.js";

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
  state = { winner: undefined, status: undefined, results: undefined, web3: null, accounts: null, contract: null, status: null };

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
    const { accounts, contract } = this.state;
    
    // check the election status on smart contract
    const response0 = await contract.methods.isVotingOpen().call();

    // update state with status of election
    if (response0 === true){
      this.setState({ status: true });
    }else{
      this.setState({ status: false });
    } 

    const totalVotes = await contract.methods.totalVotes().call(); // get total votes

    // index to get the last candidate in array
    var index = (await contract.methods.getNumofCandidates().call()) - 1;
    console.log(index);

    if (this.state.status === false){
      if (index>=0){
        const winnerObj = await contract.methods.getWinnerCandidate().call(); // first get winner candidate
        this.setState({ winner: winnerObj[1] });
        console.log(this.state.winner);
        
        for (var i=0; i<=index; i++){
          const response = await contract.methods.getCandidate(i).call(); // getCandidate is a method which returns 3 values, by default these get stored in an array, so "response" is an array
          // store response[1] into table // party name
          // store response[2] into table // votes received
          const votesPercent = response[2]/totalVotes * 100 // % of votes received
          // rows[i] = this.createData(i, response[1], response[2], votesPercent);
    }
      }
    }
  }; 

  createData(position, name, votes, percentvotes) {
    return {position, name, votes,percentvotes };
  }


  rows = [
    this.createData(1,'EFF', 900, 40.54),
    this.createData(2,'DA', 500, 22.52),
    this.createData(3,'IFP', 420, 18.92),
    this.createData(4,'ANC', 300, 13.51),
    this.createData(5,'MF', 100, 4.51),
  ];

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
          "url(" + require("./bg.png").default + ")",
      }}>
          <NavbarV/>
        <h1>Results</h1>
        <TableContainer component={Paper}>
        <Table  aria-label="customized table">
          <TableHead>
            <TableRow>
            <StyledTableCell>Position:</StyledTableCell>
              <StyledTableCell align="right">Party Name:</StyledTableCell>
              <StyledTableCell align="right">Number of Votes:</StyledTableCell>
              <StyledTableCell align="right">Percentage of Votes:</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.rows.map((row) => (
              <StyledTableRow key={row.position}>
                <StyledTableCell component="th" scope="row">
                  {row.position}
                </StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.votes}</StyledTableCell>
                <StyledTableCell align="right">{row.percentvotes}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h1>WINNER: {this.state.winner}</h1>
      </div>
  )
}
};

export default Results;
 // HorizontalBar data={data} options={options}