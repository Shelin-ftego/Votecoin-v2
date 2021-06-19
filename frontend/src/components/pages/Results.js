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

  state={results:undefined}
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