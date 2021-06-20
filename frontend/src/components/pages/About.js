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
const paperStyle2={padding :20,height:'80vh',width:1100, margin:"20px auto"};
const paperStyle3={padding :20,height:'80vh',width:1100, margin:"20px auto"};
const paperStyle4={padding :20,height:'80vh',width:1100, margin:"20px auto"};
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
                 Vote Coin is the future of voting. This adds remote voting accessibility</h5>
              </Col>
            </Row>
            </Paper>
         </Container>
         <div>
      <Paper elevation={8} style={paperStyle2}>This uses blockchain technology</Paper>
      <Paper elevation={8} style={paperStyle3}> blah blah </Paper>
      <Paper elevation={8} style={paperStyle4}>Bee bee </Paper>
    </div>
  </div>
  {/* <Footer/> */}
  </div> );
  //return (<Footer className='about'/>)
}