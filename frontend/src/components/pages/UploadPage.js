import React, {useState, useEffect, Component} from 'react';
import {Switch, Link, Redirect, useHistory} from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import NavbarV from '../NavbarV';
import axios from 'axios'

 {/*function   imageHandler(e) {
  const reader = new FileReader();
  reader.onload = () =>{
    if(reader.readyState === 2){
      profileImg= reader.result
    }
  }
}*/}


  const profileImg='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'

function UploadPage() {
 {/*  const state={
    profileImg:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  };
const [image, setImage] = useState<File>(input); 
  const fileInputRef = useRef<HTMLInputElement>(input);


  for the input image: ref={fileInputRef} 
          onChange={(event)=> {const file= event.target.files[0];
          if (file){
            setImage(file);}
            else{
              setImage(null);
            }
            }}
*/}
  

  const history = useHistory();
  const registerstyle={
    color:'blue'
  };
  const [idimage,setIDImage] = useState(null)
  const [selfie,setSelfie] = useState(null)
  
  const handleSubmit = event => {
    event.preventDefault()
    submitImages()
    };

  const submitImages = async()=>{
    try{
      const token = localStorage.getItem('token')
      const config2 ={
        headers:{
          "Content-type": "multipart/form-data",
          "Authorization": "Bearer "+ token
        }
      }
      //upload the image
      //still have ot figure out how to get the name property
      const profileImg = new FormData()
      const id_img = new FormData()
      id_img.append('id', {idimage}.idimage, {idimage}.idimage.name)
      const selfie_img = new FormData()
      selfie_img.append('self', {selfie}.selfie, {selfie}.selfie.name)
      //const selfie =  new FormData()
      //selfie.append('id', {selfie}.selfie, {selfie}.selfie.name, selfie)
      await axios.post('/voter/upload/id', id_img, config2)
      await axios.post('/voter/upload/selfie', selfie_img, config2)
      alert("Images have been uploaded")
      //console.log(response2.data)
      ///await axios.post('/voter/upload/selfie', selfie, {headers:{'Content-type':'multipart/form-data', 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token').toString())}`}})
      //history.push('/')
      history.push('/voter')
    }
    catch(e){
      console.log(e)
    }
  }
  const paperStyle={padding :20,height:'40vh',width:600, margin:"20px auto"}
  const avatarStyle={backgroundColor:'#1bbd7e'}
  const btnstyle={margin:'8px 0'}

return (
    <div>
    <NavbarV/>
      <form onSubmit={handleSubmit}>
        
        <Grid align='center'>
        <Paper elevation={20} style={paperStyle}>
        <Grid align='center'>
        <h1 align='center'>Upload Images</h1>
        </Grid>
        {/* <img src={profileImg} alt="" id="img" className="img" /> */}
        <br/>
        <div>
          <label>Upload ID(PNG): </label>
          <input type='file' id='id' required onChange={(e)=>setIDImage(e.target.files[0])} />{/*onChange={(e)=>imageHandler(e.target.files[0]) */}
        </div>
        <br/>
        <div>
          <label>Upload Selfie(PNG): </label>
          <input type='file' id='selfie' required onChange={(e)=>setSelfie(e.target.files[0]) }/>
        </div> 
        <br/>
        <div>
          <Button type='submit' color='inherit' variant="contained" style={btnstyle}>Upload Images</Button>
        </div>
        </Paper>
        
   {/* <img src={profileImg} alt="" id="profileImg" className="img" align='center' />*/} 
        </Grid>
    </form>
    </div>
)
}

export default UploadPage



