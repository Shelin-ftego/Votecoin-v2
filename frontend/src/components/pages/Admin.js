import React from 'react';
import NavbarA from '../NavbarA';
import {Switch, Link, Redirect, useHistory} from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/FaceOutlined';

//import { url } from 'inspector';

function Admin() {
    
    const paperStyle={padding :20,height:'80vh',width:1100, margin:"20px auto"};
    const avatarStyle={backgroundColor:'#1bbd7e'};
    const btnstyle={margin:'8px 0'};
    //const bgstyle={backgroundImage: src};
    return (
        <div>
            <NavbarA/>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><FaceIcon/></Avatar>
                        <h1>Welcome Back Administrator</h1>
                        <h1>What would you like to do: </h1>
                    </Grid>
                    <h1 align='center'> 
                    <Link to='/add-candidate' >
                            -Add Candidates   
                    </Link> 
                    </h1>     
            <br/>
            <h1 align='center'> 
                    <Link to='/electionstatus' >
                    -Change/View current election period   
                    </Link> 
                    </h1>  
              <br/>
              <h1 align='center'> 
                    <Link to='/view-voters' >
                    -View Voters  
                    </Link> 
                    </h1>  
                    <br/>
              <h1 align='center'> 
                    <Link to='/blockchain' >
                    -Authenticate Voters 
                    </Link> 
                    </h1>  
            <br/>
            {/*<Footer/>*/}
                </Paper>
            </Grid>
        </div>
    )
}

export default Admin

