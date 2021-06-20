import React from 'react';
import '../../App.css';
// import Footer from '../Footer';
import Navbar from '../Navbar';
//import Footer from '../Footer';

export default function About() {
  const aboutstyle={
    color:'blue'
  };

  return (<div >
   <Navbar/>
  <h1 className='about' style={aboutstyle}> ABOUT </h1>
  {/* <Footer/> */}
  </div> );
  //return (<Footer className='about'/>)
}