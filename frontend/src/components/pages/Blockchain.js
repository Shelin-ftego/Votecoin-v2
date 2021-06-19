import React, {useState, useEffect} from 'react'
import {Switch, Link, Redirect, useHistory} from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import NavbarA from '../NavbarA';
import Voterroll from '../Voterroll';
import axios from 'axios'
import Modal from 'react-modal';



// const users =[
//     {ID:'9905695119087',Name:'Shelin' ,Surname:'Pillay', Age:'21',dob:'30/02/1999', Province:'KZN',municipality:'Durban',Ward:'42' },
//     {ID:'9905694209087',Name:'Michale' ,Surname:'Paul', Age:'20',dob:'18/02/1999', Province:'KZN',municipality:'Durban',Ward:'42' },
//     {ID:'9905698339087',Name:'Sipho' ,Surname:'Mazibuko', Age:'19',dob:'16/05/1999', Province:'KZN',municipality:'Durban',Ward:'42' }
// ]

{/* Change the user const array to a json link with it called users and it will be able to pass through */}

function Blockchain() {
    
    const [users,setUsers] = useState([
        {National_id:'9905695119087',Name:'Shelin' ,Surname:'Pillay'},
        {National_id:'9905694209087',Name:'Michale' ,Surname:'Paul'},
        {National_id:'9905698339087',Name:'Sipho' ,Surname:'Mazibuko'}
    ]);

    const getVoters = async()=>{
        try{
          const token = localStorage.getItem('token')
          const config ={
            headers:{
              "Content-type": "multipart/form-data",
              "Authorization": "Bearer "+ token
            }
          }
          const voters = await axios.get('/admin/voters-unverified', config)
          setUsers(voters.data)
          console.log(voters.data)
          return voters
        }
        catch(e){
          console.log(e)
        }
    }

      useEffect(()=>{
        const response = getVoters()
        console.log(response)
        }, [])

        const paperStyle={padding :20,height:'120vh',width:900, margin:"20px auto"};
        const avatarStyle={backgroundColor:'#1bbd7e'};
        const btnstyle={margin:'8px 0'};

    return (
        <div>
          <NavbarA/>
          
        <Grid>
          <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
          <h1>Unverified Voters</h1>
          </Grid>
          {
              users.map((user) => <Voterroll ID={user.National_id} Name={user.Name} Surname={user.Surname} />)
          }
          </Paper>
        </Grid>
        <div>
          {/* <Modal isOpen ={openmodal}  style={{content: {
                                      position: 'absolute',
                                      top: '100px',
                                      left: '150px',
                                      right: '150px',
                                      bottom: '50px',
                                      padding: '100px'
                                    }}}>
              <button onClick = {()=>togglemodal(false)}>Close modal</button>
          </Modal> */}
        </div>
        </div>
    )
}

export default Blockchain