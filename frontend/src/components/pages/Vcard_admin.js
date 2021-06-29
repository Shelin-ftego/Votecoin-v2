import React, { useState, useEffect } from "react";
// import { render } from "react-dom";
import _ from "lodash";
import { Button, Card, Divider, Image, Placeholder, Header, Icon, Modal,} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import { Grid } from '@material-ui/core';
import axios from "axios";
import { Link } from "react-router-dom";
import Candidate_view_admin from '../Candidate_view_admin';
import NavbarA from '../NavbarA';


 function Vcard_admin () {
  const [candidates,setCandidates] = useState([
    {Political_party:'Default'}
  ])
  const [candidate_image, setCandidate_image] = useState(undefined)
  

    const getCandidates = async()=>{
        try{
          const token = localStorage.getItem('token')
          const config ={
            headers:{
              "Content-type": "multipart/form-data",
              "Authorization": "Bearer "+ token
            }
          }

          const election_candidates = await axios.get('/voter/get-candidates', config)
          setCandidates(election_candidates.data)
          console.log(election_candidates.data)
          return election_candidates
        }
        catch(e){
          console.log(e)
        }
    }

    useEffect(()=>{
      const response = getCandidates()
      //setCandidates(response)
      console.log(response)
      }, [])

  return (
    <div style={{
      backgroundImage:
        "url(" + require("./images/bg.png").default + ")", backgroundRepeat:'no-repeat', backgroundSize:'100% 100%'
    }}>
      <NavbarA/>
      {
          candidates.map((cand, index) => <Candidate_view_admin PartyName={cand.Political_party} Cand_index ={index} />)
      }

      {' '}
      <br/>
      {' '}
      <br/>
      {' '}
      <br/>
      {' '}
      <br/>
      {' '}
      <br/>
      {' '}
      <br/>
      {' '}
      <br/>
      {' '}
      <br/>
      {' '}
      <br/>
      {' '}
      <br/>
      {' '}
      <br/>
      {' '}
      <br/>
      {' '}
      <br/>
      {' '}
      <br/>
      {' '}
      <br/>
    </div>
 )
}

export default Vcard_admin;