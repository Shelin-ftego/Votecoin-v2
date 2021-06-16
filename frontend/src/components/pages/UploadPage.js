import React, {useState, useEffect, Component} from 'react';
import {Switch, Link, Redirect, useHistory} from 'react-router-dom';
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import NavbarV from '../NavbarV';
import axios from 'axios'

{/*function   imageHandler(e) {
  const reader = new FileReader();
  reader.onload = () =>{
    if(reader.readyState === 2){
      this.setState({profileImg: reader.result})
    }
  }
  reader.readAsDataURL(e.target.files[0])
};*/}


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
      const id_img = new FormData()
      id_img.append('id', {idimage}.idimage, {idimage}.idimage.name)
      const selfie_img = new FormData()
      selfie_img.append('self', {selfie}.selfie, {selfie}.selfie.name)
      //const selfie =  new FormData()
      //selfie.append('id', {selfie}.selfie, {selfie}.selfie.name, selfie)
      await axios.post('/voter/upload/id', id_img, config2)
      await axios.post('/voter/upload/selfie', selfie_img, config2)
      //console.log(response2.data)
      ///await axios.post('/voter/upload/selfie', selfie, {headers:{'Content-type':'multipart/form-data', 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token').toString())}`}})
      //history.push('/')
      history.push('/voter')
    }
    catch(e){
      console.log(e)
    }
  }


return (
    <div>
    <NavbarV/>
      <form onSubmit={handleSubmit}>
        <h1>Upload page</h1>
        {/* <img src={profileImg} alt="" id="img" className="img" /> */}
        <div>
          <label>Upload ID(PNG): </label>
          <input type='file' id='id' onChange={(e)=>setIDImage(e.target.files[0])} />
        </div>
        <div>
          <label>Upload Selfie(PNG): </label>
          <input type='file' id='selfie' onChange={(e)=>setSelfie(e.target.files[0]) }/>
        </div> 
        <div>
          <Button type='submit' color='inherit' variant="contained" >Upload Images</Button>
        </div>
    </form>
    </div>
)
}

export default UploadPage
