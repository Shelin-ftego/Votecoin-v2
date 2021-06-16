const express = require('express')
const router = express.Router()
const Admin = require('../database_models/admin')
const Voter = require('../database_models/voter')
router.use(express.json())


//check if details exist(voter) exclude the password for now
router.post('/login/voter', async (req, res)=>{
    try{
        console.log(12)
        console.log(req.body) //for testing
        const voter =  await Voter.findPersonal(req.body.National_id, req.body.Password)
        const token = await voter.generate_token()
        const result = "In"
        res.status(201).send({token})  
      }  //used to send {voter, token}
    catch(e){
        res.status(400).send("Out")
        console.log(e)
    }
})

//check if details exist(voter) exclude the password for now
router.post('/login/admin', async (req, res)=>{
    try{
        console.log(12)
        console.log(req.body)
        const admin =  await Admin.findPersonal(req.body.Admin_id, req.body.Password)
        const token = await admin.generate_token() 
        res.status(201).send({token}) //used to send {admin, token}
    }
    catch(e){
        res.status(400).send("Out")
        console.log(e)
    }
})

module.exports = router