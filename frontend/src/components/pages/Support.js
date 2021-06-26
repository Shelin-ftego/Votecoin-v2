import React from 'react';
import '../../App.css';
import './Support.css';
//import Footer from '../Footer';
import Navbar from '../Navbar';
import { Grid,Paper, Avatar, TextField, Button, Typography, responsiveFontSizes } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function Support() {
  const inputstyle={    padding:20,
  border: 2,
  margin: 10,
  };

  const paperStyle={padding :20,height:'45vh',width:1100, margin:"20px auto"};
  const paperStyle1={padding :20,height:'38vh',width:1100, margin:"20px auto"};
  const avatarStyle={backgroundColor:'#1bbd7e'};
  const btnstyle={margin:'8px 0', border:20};

  return (<div style={{
    backgroundImage:
      "url(" + require("./vote.png").default + ")",
  }}>
  <Navbar/>
  <Paper elevation={10} style={paperStyle}>
  <section>
  <h1  align='center'> SUPPORT PAGE</h1>
        <h1 align='center'>
          Get in touch with us we will provide support!
        </h1>
        <h1 align='center'>
          Service Provided 24/7
        </h1>
        <div>
          <form align='center'>
            <input
              style={inputstyle}
              name='email'
              type='email'
              placeholder='Your Email'
            />
                        <input
              style={inputstyle}
              name='name'
              type='name'
              placeholder='Your Name'
            />
                        <input
              style={inputstyle}
              name='number'
              type='number'
              placeholder='Your Number'
            />
          </form>
          <div align='center'>
          <Button align='center' style={btnstyle} >Contact</Button>
          </div>
        </div>
  <div className='social-icons'>
            <Link
              className='social-icon-link facebook'
              to='/'
              target='_blank'
              aria-label='Facebook'
            >
              <i className='fab fa-facebook-f' />
            </Link>
            <Link
              className='social-icon-link instagram'
              to='/'
              target='_blank'
              aria-label='Instagram'
            >
              <i className='fab fa-instagram' />
            </Link>
            <Link
              className='social-icon-link youtube'
              to='/'
              target='_blank'
              aria-label='YouTube'
            >
              <i className='fab fa-youtube' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='Twitter'
            >
              <i className='fab fa-twitter' />
            </Link>
            <Link
              className='social-icon-link twitter'
              to='/'
              target='_blank'
              aria-label='LinkedIn'
            >
              <i className='fab fa-linkedin' />
            </Link>
          </div>
      </section>
  </Paper>
  <Paper elevation={10} style={paperStyle1}>
   <h1 align='center' >REACH US @</h1>
   <h2 align='center' >Address: 238 Mazisi Kunene Road, Glenwood Durban University of KZN Durban 4041</h2>
   <h2 align='center' >Phone: 031 260 1111</h2>
   <h2 align='center' >Email: enquiries@ukzn.ac.za</h2>
  </Paper>
  {/* <Footer/> */}
  </div>);
}

