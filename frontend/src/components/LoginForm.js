import axios from 'axios';
import React, { useState, useEffect } from 'react'

function LoginForm({ Login, error}) {
   const [id, SetID] = useState("");
   const [password, SetPassword] = useState("");
   const [usertype, SetUser] = useState("Admin");
   //temporary state to show that a user has logged in or not
   const [loginstatus, setLogin]= useState("Not logged in");

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
                const response1 = axios.post('/login/voter', JSON.stringify(UserDetails), {headers:{'Content-type':'application/json'}})
                .then(res =>{setLogin("Logged in")})   
                .catch(e=>{console.log(e)})
                const jwtoken = response1.token
                //const response = await axios.get()
            }
            else{
                const UserDetails = {
                    Admin_id: {id}.id
                    ,Password: {password}.password
                }
                console.log(JSON.stringify(UserDetails))
                const response1 = axios.post('/login/admin', JSON.stringify(UserDetails), {headers:{'Content-type':'application/json'},})
                .then(res =>{setLogin("Logged in")})  
                .catch(e=>{console.log(e)})
                //const response = await axios.get('/admin', {headers:{'Content-type':'application/json',  'Authorization': `Bearer ${jwtoken}`}})//
            }
        }
        catch(e){
            console.log(e)
        }
        
    }
       

    //{()=>checkUser()}
    return (
        <form onSubmit = {handleSubmit}  >
            <div className="form-group">
             <h2>{usertype} Login</h2>
               <div className="form-group">
                   <label htmlFor="Name">ID:</label> 
                   <input type="text" id="id" value = {id} onChange={(e) => SetID(e.target.value)}/>
               </div> 
               <div className="form-group">
                   <label htmlFor="Password">Password:</label>
                   <input type="password"  id="password" value = {password} onChange={(e) => SetPassword(e.target.value)}/>
               </div>
                <input type= "submit" value="LOGIN"/>
            <div>
                <button type="button" onClick = {()=>SetUser("Admin")}> Admin</button>
                <button type="button" onClick = {()=>SetUser("Voter")}> Voter</button>
            </div>
            <div>
                {loginstatus}
            </div>
                
            </div>
        </form>  
              
    )
    

}
export default LoginForm
