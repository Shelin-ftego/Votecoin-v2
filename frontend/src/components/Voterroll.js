import React, {useState, useEffect} from 'react'
import Modal from 'react-modal';
import axios from 'axios';
import { Grid,Paper, Avatar, TextField, Button, Typography } from '@material-ui/core';

const Voterroll = function (props){
    const [image, setImage] = useState(null)
    const [selfie, setSelfie] = useState(null)
    const [openmodal, togglemodal] = useState(false)
    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"};
    const avatarStyle={backgroundColor:'#1bbd7e'};
    const btnstyle={margin:'8px 0'};
    
    const displayid = async(idnumber)=>{
        try{
            
            const token = localStorage.getItem('token')
            const config ={
              headers:{
                "Content-type": "multipart/form-data",
                "Authorization": "Bearer "+ token
              }
            }
            const raw_image_data = await axios.get(`/admin/voters/${idnumber}/id`, config)
            //const imagetag=`http://localhost:3000/blockchain/admin/voters/${idnumber}/id`
            const image_data = new Buffer(raw_image_data.data).toString('base64')
            const new_image_string = "http://localhost:4000/admin/voters/"+ idnumber.toString()+"/id"
            const new_seflie_string = "http://localhost:4000/admin/voters/"+ idnumber.toString()+"/selfie"
            setImage(new_image_string)
            setSelfie(new_seflie_string)
            togglemodal(true)
            console.log(image_data)
            console.log(image)
          }
          catch(e){
            console.log(e)
            togglemodal(true)
          }
    }

    const auth = async(idnumber)=>{
        try{
            
            const token = localStorage.getItem('token')
            const config ={
              headers:{
                "Content-type": "multipart/form-data",
                "Authorization": "Bearer "+ token
              }
            }
            await axios.patch(`/admin/${idnumber}/voter-auth`,{}, config)
            console.log("authenticated")
            //should refresh page
        }
        catch(e){
        }
    }

    return(
        <div>
            <h1>  </h1>
            <h3>ID: {props.ID} Name: {props.Name} Surname: {props.Surname}</h3>
            <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={displayid.bind(this,props.ID)}>View ID</Button> <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick={auth.bind(this, props.ID)}>Authenticate User</Button>
            <Modal isOpen ={openmodal}  style={{content: {
                                      position: 'absolute',
                                      top: '100px',
                                      left: '150px',
                                      right: '150px',
                                      bottom: '50px',
                                      padding: '100px'
                                    }}} ariaHideApp={false}>
                <div>
                  <h1>{props.ID}</h1> 
                </div>
                <div>
                   <h2> Identity document</h2>     
                   <img src ={image} ></img>  
                </div>
                <div>
                   <h2> Selfie</h2>     
                   <img src ={selfie} ></img>  
                </div>

                
              <Button type='submit' color='primary' variant="contained" style={btnstyle} onClick = {()=>togglemodal(false)}>Close image</Button>
          </Modal>
        </div>
    )
}

export default Voterroll


