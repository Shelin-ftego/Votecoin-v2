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
  state = { results: undefined, web3: null, accounts: null, contract: null, status: null };

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
    // const winner = await contract.methods.getWinnerCandidate().call(); // first get winner candidate
    // console.log(winner);

    const totalVotes = await contract.methods.totalVotes().call(); // get total votes

    // index to get the last candidate in array
    var index = (await contract.methods.getNumofCandidates().call()) - 1;
    console.log(index);

    if (index>=0){
      // getCandidate is a method which returns 3 values, by default these get stored in an array, so "response" is an array
      for (var i=0; i<=index; i++){
        const response = await contract.methods.getCandidate(i).call();
        // store response[1] into table // party name
        // store response[2] into table // votes received
        // % votes = response[2]/totalVotes * 100 // % of votes received
      }
    }
  };    

  createData(name, votes, totalvotes) {
    return { name, votes, totalvotes };
  }
  rows = [
    this.createData('EFF', 700, 2720),
    this.createData('DA', 500, 2720),
    this.createData('IFP', 200, 2720),
    this.createData('ANC', 900, 2720),
    this.createData('MF', 420, 2720),
  ];
  render(){
    return (
      <div>
          <NavbarV/>
        <h1>Results</h1>
        <TableContainer component={Paper}>
        <Table  aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Party Name:</StyledTableCell>
              <StyledTableCell align="right">Number of Votes:</StyledTableCell>
              <StyledTableCell align="right">Total Votes:</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="right">{row.votes}</StyledTableCell>
                <StyledTableCell align="right">{row.totalvotes}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <h1>YOUR WINNER IS: ANC</h1>
      </div>
  )
}
};

export default Results;
 // HorizontalBar data={data} options={options}