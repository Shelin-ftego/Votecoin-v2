import React from 'react'
//import Footer from '../Footer'
import NavbarV from '../NavbarV'
import {Switch, Link, Redirect, useHistory} from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/FaceOutlined';

function Voter() {

    const paperStyle={padding :20,height:'80vh',width:1100, margin:"20px auto"};
    const avatarStyle={backgroundColor:'#1bbd7e'};
    const btnstyle={margin:'8px 0'};

    return (
        <div>
            <NavbarV/>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><FaceIcon/></Avatar>
                        <h1>Welcome Voter</h1>
                        <h1>Here you are able to: </h1>
                    </Grid>
                    <h1 align='center'> 
                    <Link to='/Vcard' >
                            -Vote   
                    </Link> 
                    </h1>     
            <br/>
            <h1 align='center'> 
                    <Link to='/verify' >
                    -Verify if your vote has been cast   
                    </Link> 
                    </h1>  
              <br/>
              <h1 align='center'> 
                    <Link to='/results' >
                    -View Results when available   
                    </Link> 
                    </h1>  
                    <br/>
              <h1 align='center'> 
                    <Link to='/upload' >
                    -Upload required documents  
                    </Link> 
                    </h1>  
            <br/>
            {/*<Footer/>*/}
                </Paper>
            </Grid>
        </div>
    )
}

export default Voter