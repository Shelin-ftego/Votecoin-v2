import React, { useState } from "react";
// import { render } from "react-dom";
import _ from "lodash";
import { Button, Card, Divider, Image, Placeholder, Header, Icon, Modal,} from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import axios from "axios";
import { Link } from "react-router-dom";
import Candidate_view from '../Candidate_view';

const cards = [
    {PartyName:'ANC',Name:'CYRIL'},
    {PartyName:'DA',Name:'STEENMAN'},
    {PartyName:'EFF',Name:'JUJU'}
];
//Change from constant to web3 command, uses candidate view. 

const Vcard = () => {
  const [loading, setLoading] = useState(false);
  const [voteForA, setVoteForA] = useState(0);
  const [voteForB, setVoteForB] = useState(0);
  const [voted, setVoted] = useState(false);
  const [open, setOpen] = useState(false);
  const [openVoted, setOpenVoted] = useState(false);

//**********************************Calling smart contract functions****************************************************************/ 
            //Voting fOR Party B

  // const handleLoadingClick = () => {
  //   setLoading(true);

  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 3000);
  // };

  const submitVote = () => {
    axios
      .post("https://5fa5e7ad085bf700163de0f9.mockapi.io/vote", {
        partyA: voteForA,
        partyB: voteForB,
      })
      .then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  };




  return (
    <div>
     {
      cards.map((user) => <Candidate_view PartyName={user.PartyName} Name={user.Name}/>)
     }
     <br/>
     <Link to to='/voter'>
     <button> BACK </button>
     </Link>
      </div>
 );
};

export default Vcard;