import { Grid } from '@material-ui/core';
import React, {useState, useEffect} from 'react'
import {Switch, Link, Redirect, useHistory} from 'react-router-dom';
import NavbarA from '../NavbarA'
import Voterroll_view from '../Voterroll_view';
import axios from 'axios'
import Modal from '../modal'


function Blockchain() {

    const [users,setUsers] = useState([]);
    const getVoters = async()=>{
        try{
          const token = localStorage.getItem('token')
          const config ={
            headers:{
              "Content-type": "multipart/form-data",
              "Authorization": "Bearer "+ token
            }
          }
          const voters = await axios.get('/admin/voters', config)
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

    return (
        <div>
            <main>
            <NavbarA/>
            <h1>VOTERS</h1>
           <Grid>
            {
                users.map((user) => <Voterroll_view ID={user.National_id} Name={user.Name} Surname={user.Surname}  
                                    Province={user.Address.Province} Municipality={user.Address.Municipality} Ward={user.Address.Ward} District={user.Address.District}
                                    Reg = {user.Registered} Voted = {user.Voted}/>)
            }
           </Grid>
           </main>


         {/* As you can see above when you map you will be able to pull out only the ID just by using map and user.ID */}
       </div>
    )
}

export default Blockchain