import React from 'react';
import '../../App.css';
// import Footer from '../Footer';
import Navbar from '../Navbar';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
//import Footer from '../Footer';
import {Input, InputGroupAddon, InputGroupText, InputGroup, Container, Row, Col} from "reactstrap";
import { Grid, Avatar, TextField, Button, Typography } from '@material-ui/core';

const paperStyle={padding :20,height:'16vh',width:160, margin:"20px auto"};
const paperStyle1={padding :20,height:'17vh',width:1100, margin:"20px auto"};
const paperStyle2={padding :20,height:'23vh',width:1100, margin:"20px auto"};
const paperStyle3={padding :20,height:'50vh',width:1100, margin:"20px auto"};
const paperStyle4={padding :20,height:'29vh',width:1100, margin:"20px auto"};
const avatarStyle={backgroundColor:'#1bbd7e'};
const btnstyle={margin:'8px 0'};

export default function About() {

  return (<div style={{
    backgroundImage:
      "url(" + require("./vote.png").default + ")",
  }} >
   <Navbar/>
   <Paper elevation={10} style={paperStyle}>
  <h1 align='center'> ABOUT PAGE </h1>
  </Paper>
  <div className="section section-about-us">
          <Container>
            <Paper elevation={8} style={paperStyle1}>
            <Row>
              <Col className="ml-auto mr-auto text-center" md="8">
                <h2 className="title" align='center'>Who we are?</h2>
                <h5 align='center' className="description">
                 Vote Coin is the future of voting. This adds remote and secure voting accessibility.</h5>
              </Col>
            </Row>
            </Paper>
         </Container>
         <div>
      <Paper elevation={8} style={paperStyle2}>
      <body align='center'>Throughout the years of ballot paper elections, the losing candidate often contends that there was voter fraud involved. It has been identified that this conflict arises from the requirement to trust a third party to act fairly in vote counting. 
            A proposed solution to this is using a voting system that eliminates the need to trust the third party. This report aims to explain the various components required to implement an electronic voting system that uses blockchain technology. The proposed 
            solution seeks to ensure an auditable, transparent, and secure voting system whilst maintaining voter anonymity to alleviate conflicts during and after elections. The introductory chapters aim to explain the problems with the current ballot paper voting 
            system and the concept of what a blockchain is, and how it operates. The consequent chapters discuss and present the potential solutions for implementing a voting system using blockchain technology. The concluding chapters focus on the costs and feasibility 
            of implementing this system.</body>   
        </Paper>
      <Paper elevation={8} style={paperStyle3}> 
      <h1 align='center'>VoteCoin prides itself on privacy of voters</h1>
        <h5 align='center' className="description">
         This is done through the use of blockchain technology
        </h5>
        <h1 align='center'>What is blockchain?</h1>
        <body align='center'>Blockchain seems complicated, and it definitely can be, but its core concept is really quite simple. A blockchain is a type of database. To be able to understand blockchain, it helps to first understand what a database actually is. 
        A database is a collection of information that is stored electronically on a computer system. Information, or data, in databases is typically structured in table format to allow for easier searching and filtering for specific information.
        
        Blockchain is a system of recording information in a way that makes it difficult or impossible to change, hack, or cheat the system.

A blockchain is essentially a digital ledger of transactions that is duplicated and distributed across the entire network of computer systems on the blockchain. Each block in the chain contains a number of transactions, and every time a new transaction occurs on the blockchain, a record of that transaction is added to every participant’s ledger. The decentralised database managed by multiple participants is known as Distributed Ledger Technology (DLT).

Blockchain is a type of DLT in which transactions are recorded with an immutable cryptographic signature called a hash.
        
        </body>
       </Paper>
      <Paper elevation={8} style={paperStyle4}>
        <h1 align='center'>Is Blockchain Secure?</h1>
        <body align='center'>
        
Blockchain technology accounts for the issues of security and trust in several ways. First, new blocks are always stored linearly and chronologically. That is, they are always added to the “end” of the blockchain. If you take a look at Bitcoin’s blockchain, you’ll see that each block has a position on the chain, called a “height.” As of November 2020, the block’s height had reached 656,197 blocks so far. 

After a block has been added to the end of the blockchain, it is very difficult to go back and alter the contents of the block unless the majority reached a consensus to do so. That’s because each block contains its own hash, along with the hash of the block before it, as well as the previously mentioned time stamp. Hash codes are created by a math function that turns digital information into a string of numbers and letters. If that information is edited in any way, the hash code changes as well.
          </body>
      </Paper>
    </div>
  </div>
  {/* <Footer/> */}
  </div> );
  //return (<Footer className='about'/>)
}