import React, {useState} from 'react';
import NavbarV from '../NavbarV';  
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


function Verfication() {
    const [data,setData] = useState(null);
    const [print,setPrint] = useState(null);

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}


  function getData(val)
 {
     setData(val.target.value)
     console.warn(val.target.value)
 } 

    return (
        <div>
            <NavbarV/>
            {
                print?
                <h1>{data}</h1>
                :null
            }
            <h1>{data}</h1>
            <Grid>
            <Paper elevation={10} style={paperStyle}>
            <Grid align='center'>
                   <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
               <h2>Check Registration:</h2>
              </Grid>
            <TextField label='Voter Number:' placeholder='Please enter Voter Number:' onChange={getData}/>
            <br/>
            <br/>
            <Button type='submit' color='primary' variant="contained" onClick={()=>setPrint(true)} style={btnstyle}>Check Voter number: </Button>
            </Paper>
            </Grid>
        </div>
    )
}

export default Verfication

