import { Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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

function createData(name, votes, totalvotes) {
  return { name, votes, totalvotes };
}

const rows = [
  createData('EFF', 700, 2720),
  createData('DA', 500, 2720),
  createData('IFP', 200, 2720),
  createData('ANC', 900, 2720),
  createData('MF', 420, 2720),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const Results = () => {
  const [results, setResults] = useState([]);
  
  // Get winner from smart contracts*/

  //useEffect(() => {
  //  axios.get("https://5fa5e7ad085bf700163de0f9.mockapi.io/vote").then(
  //    (response) => {
   //     console.log(response.data);

  //      setResults(response.data);
  //    },
   //   (error) => {
   //     console.log(error);
   //   }
   // );
  //}, []);

 // const totalVotesA = results
   // .map((item) => item.partyA)
  //  .reduce((prev, curr) => prev + curr, 0);

  //const totalVotesB = results
  //  .map((item) => item.partyB)
  //  .reduce((prev, curr) => prev + curr, 0);

  //const data = {
  //  labels: ["ANC", "DA"],
   // datasets: [
   //   {
   //     label: "# of Votes",
    //    data: [totalVotesA, totalVotesB, 0],
    //    backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
    //    borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
    //    borderWidth: 1,
  //    },
  //  ],
 // };

 // const options = {
  //  scales: {
  //    yAxes: [
   //     {
  //        ticks: {
   //         beginAtZero: true,
   //       },
   //     },
   //   ],
   // },
  //};
  const classes = useStyles();
  return (
    <div>
        <NavbarV/>
      <h1>Results</h1>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Party Name:</StyledTableCell>
            <StyledTableCell align="right">Number of Votes:</StyledTableCell>
            <StyledTableCell align="right">Total Votes:</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
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


    <h1>YOU'RE WINNER IS: ANC</h1>
    </div>
  );
};

export default Results;
 // HorizontalBar data={data} options={options}