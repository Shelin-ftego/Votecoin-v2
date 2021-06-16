import React from 'react';
import '../../App.css';
import Footer from '../Footer';
import Navbar from '../Navbar';

export default function Support() {
  const supportstyle={
    color:'blue'
  };
  return (<div>
  <Navbar/>
  <h1 className='support' style={supportstyle} > SUPPORT </h1>
  <Footer/>
  </div>);
}

