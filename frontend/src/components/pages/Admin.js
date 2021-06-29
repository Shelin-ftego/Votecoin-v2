import React from 'react';
import NavbarA from '../NavbarA';
import {Switch, Link, Redirect, useHistory} from 'react-router-dom';
import { Grid,Paper, Avatar } from '@material-ui/core';
import FaceIcon from '@material-ui/icons/FaceOutlined';


function Admin() {
    
    const paperStyle={padding :20,height:'80vh',width:550, margin:"20px auto"};
    const avatarStyle={backgroundColor:'#1bbd7e'};
    const btnstyle={margin:'8px 0'};
    
    return (
        <div style={{
            backgroundImage:
              "url(" + require("./images/bg.png").default + ")", backgroundRepeat:'no-repeat', backgroundSize:'100% 100%'
          }}>
            <NavbarA/>
            <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><FaceIcon/></Avatar>
                        <h1>Welcome Back Administrator!</h1>
                        <h2>What would you like to do? </h2>
                    </Grid>
                    <h2 align='center'> 
                    <Link to='/add-candidate' >
                    🔵Add Candidates   
                    </Link> 
                    </h2>     
            <br/>
            <h2 align='center'> 
                    <Link to='/electionstatus' >
                    🔵Change/View Current Election Period   
                    </Link> 
                    </h2>  
              <br/>
              <h2 align='center'> 
                    <Link to='/view-voters' >
                    🔵View Voters  
                    </Link> 
                    </h2>  
                    <br/>
              <h2 align='center'> 
                    <Link to='/blockchain' >
                    🔵Authenticate Voters 
                    </Link> 
                    </h2>  
            <br/>
            {/*<Footer/>*/}
                </Paper>
            </Grid>
            {' '}
            <br/>
            {' '}
            <br/>
        </div>
    )
}

export default Admin

