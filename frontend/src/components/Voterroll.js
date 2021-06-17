import React, {useState, useEffect} from 'react'
import Modal from 'react-modal';
import axios from 'axios'

const Voterroll = function (props){
    const [image, setImage] = useState(null)
    const [selfie, setSelfie] = useState(null)
    const [openmodal, togglemodal] = useState(false)
    
    const displayid = async(idnumber)=>{
        try{
            
            const token = localStorage.getItem('token')
            const config ={
              headers:{
                "Content-type": "multipart/form-data",
                "Authorization": "Bearer "+ token
              }
            }
            setImage(1)
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
            console.log("authenticated")
            const token = localStorage.getItem('token')
            const config ={
              headers:{
                "Content-type": "multipart/form-data",
                "Authorization": "Bearer "+ token
              }
            }
            await axios.patch(`/admin/${idnumber}/voter-auth`,{}, config)
            //should refresh page
        }

        catch(e){

        }
    }

    return(
        <div>
            <h1>  </h1>
            <h3>ID: {props.ID} Name: {props.Name} Surname: {props.Surname}</h3>
            <button onClick={displayid.bind(this,props.ID)}>View ID</button> <button onClick={auth.bind(this, props.ID)}>Authenticate User</button>
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

                
              <button onClick = {()=>togglemodal(false)}>Close image</button>
          </Modal>
        </div>
    )
}

export default Voterroll


