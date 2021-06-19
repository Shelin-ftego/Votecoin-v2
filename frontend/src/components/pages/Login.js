import React, {useState, useEffect, Component} from 'react'
import {Switch, Link, Redirect, useHistory} from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Navbar from '../Navbar';
import axios from 'axios'


function Login() {
const history = useHistory();
const [click, setClick] = useState(false);
const [button, setButton] = useState(true);

 const [id, SetID] = useState("");
const [password, SetPassword] = useState("");
const [usertype, SetUser] = useState("Voter");
const handleClick = () => setClick(!click);
const closeMobileMenu = () => setClick(false);
const handleSubmit = event => {
event.preventDefault()
checkUser()
};
    const checkUser = async()=>{
        try{
            if({usertype}.usertype==="Voter"){
                const UserDetails = {
                    National_id: {id}.id
                    ,Password: {password}.password
                }
                console.log(JSON.stringify(UserDetails))
                const response1 = await axios.post('/login/voter', JSON.stringify(UserDetails), {headers:{'Content-type':'application/json'}})
                localStorage.setItem('token', response1.data.token)
                console.log(response1)
                history.push('/voter')
                //const response = await axios.get()
            }
            else{
                const UserDetails = {
                    Admin_id: {id}.id
                    ,Password: {password}.password
                }
                console.log(JSON.stringify(UserDetails))
                const response1 = await axios.post('/login/admin', JSON.stringify(UserDetails), {headers:{'Content-type':'application/json'},})
                localStorage.setItem('token', response1.data.token)
                console.log(response1)
                //return <Redirect to="/admin" />
                history.push('/admin')
                //const response = await axios.get('/admin', {headers:{'Content-type':'application/json',  'Authorization': `Bearer ${jwtoken}`}})//
            }
            
        }
        catch(e){
            console.log(e)
        }
        
    }

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}

    return (
        <form  onSubmit = {handleSubmit}>
            <div>
                <Navbar/>
                        <Grid>
                <Paper elevation={10} style={paperStyle}>
                    <Grid align='center'>
                        <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                        <h2>{usertype} Login</h2>
                    </Grid>
                    <TextField label='ID' placeholder='Enter identification number' fullWidth required value = {id} onChange={(e) => SetID(e.target.value)}/>
                    <TextField label='Password' placeholder='Enter password' type='password' fullWidth required value = {password} onChange={(e) => SetPassword(e.target.value)} />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth onClick={closeMobileMenu} >Sign in</Button>
                    <div>
                        <input type= 'radio' value="Voter" name="User" defaultChecked onChange={()=>SetUser("Voter")}/> Voter
                        <input type= 'radio' value="Admin" name="User"  onChange={()=>SetUser("Admin")}/> Admin
                    </div>
                    <Typography > Do you have an account ?
                    <Link to='/register' onClick={closeMobileMenu} >
                            Register   
                    </Link> 
                    </Typography>
                </Paper>
            </Grid>
            </div>
        </form>
    )}

export default Login


