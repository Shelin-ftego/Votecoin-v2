import React, {useState, useEffect} from 'react'
import Modal from 'react-modal';
import axios from 'axios'

const Voterroll = function (props){
    const [image, setImage] = useState(null)
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
            //const image = await axios.get(`/admin/voters/${idnumber}/id`, config)
            //const imagetag = image.data.toString('base64')
            const imagetag=`http://localhost:3000/blockchain/admin/voters/${idnumber}/id`
            setImage(imagetag)
            togglemodal(true)
            console.log(image.data.toString())
          }
          catch(e){
            console.log(e)
            setImage(null)
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
                <h1>{props.ID}</h1>
                <img src ={{uri:`data:image/gif;base64,${image}`}} ></img>
              <button onClick = {()=>togglemodal(false)}>Close image</button>
          </Modal>
        </div>
    )
}

export default Voterroll


