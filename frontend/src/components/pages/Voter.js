import React from 'react'
//import Footer from '../Footer'
import NavbarV from '../NavbarV'
import {Switch, Link, Redirect, useHistory} from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/FaceOutlined';

function Voter() {

    const paperStyle={padding :20,height:'85vh',width:700, margin:"20px auto",backgroundColor:'white'};
    const avatarStyle={backgroundColor:'#1bbd7e'};
    const btnstyle={margin:'8px 0'};

    return (
        <div style={{
            backgroundImage:
              "url(" + require("./bg.png").default + ")", backgroundRepeat:'no-repeat', backgroundSize:'100% 100%'
          }}>
            <NavbarV/>
            <Grid >
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><FaceIcon/></Avatar>
                        <h1>Welcome Voter!</h1>
                        <h1>What would you like to do? </h1>
                    </Grid>
                    <h1 align='center'> 
                    <Link to='/Vcard' >
                            -Vote   
                    </Link> 
                    </h1>     
            <br/>
            <h1 align='center'> 
                    <Link to='/verify' >
                    -Verify Your Vote   
                    </Link> 
                    </h1>  
              <br/>
              <h1 align='center'> 
                    <Link to='/results' >
                    -View Results  
                    </Link> 
                    </h1>  
                    <br/>
              <h1 align='center'> 
                    <Link to='/upload' >
                    -Upload Required Documents  
                    </Link> 
                    </h1>  
            <br/>
            {/*<Footer/>*/}
                </Paper>
            </Grid>
            <br/>
        </div>
    )
}

export default Voter