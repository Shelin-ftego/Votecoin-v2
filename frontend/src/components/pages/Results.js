import { Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NavbarV from '../NavbarV';
//import axios from "axios";
//import { HorizontalBar } from "@reactchartjs/react-chart.js";


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

  return (
    <div>
      <h1>Results</h1>
    </div>
  );
};

export default Results;
 // HorizontalBar data={data} options={options}