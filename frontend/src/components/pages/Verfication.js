import React, {useState, Component} from 'react';
import NavbarV from '../NavbarV';  
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
const avatarStyle={backgroundColor:'#1bbd7e'}
const btnstyle={margin:'8px 0'}


class Verfication extends Component{
    state = {data:undefined, print:undefined}


    getData(val)
    {
        this.setState({data:val})
        console.warn(val.target.value)
    } 

    render(){
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }        
    
    return (
        <div>
            <NavbarV/>
            {
                this.state.print?
                <h1>{this.state.data}</h1>
                :null
            }
            <h1>{this.state.data}</h1>
            <Grid>
            <Paper elevation={10} style={this.paperStyle}>
            <Grid align='center'>
                   <Avatar style={this.avatarStyle}><LockOutlinedIcon/></Avatar>
               <h2>Check Registration:</h2>
              </Grid>
            <TextField label='Voter Number:' placeholder='Please enter Voter Number:' /*onChange={this.setState({data:'what is this for'})}*//>
            <br/>
            <br/>
            <Button type='submit' color='primary' variant="contained" onClick={()=>this.setState({print:true})} style={btnstyle}>Check Voter number: </Button>
            </Paper>
            </Grid>
        </div>
    )
    }
}

export default Verfication

