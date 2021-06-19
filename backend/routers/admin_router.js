const express = require('express')
const router = express.Router()
const Admin = require('../database_models/admin')
const Voter = require('../database_models/voter')
const Candidate = require('../database_models/candidate')
const Voters_Roll = require('../database_models/voters_roll')
const authentication = require('../middleware/admin_authentication')
const multer = require('multer')
const sharp = require('sharp')
router.use(express.json())

//multer function
const upload_image = multer({
    fileFilter(req, file, cb){
        
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error("File is not the correct type"))
        }
        else{
            cb(undefined, true)
        }
    }
})


//temporary endpoint for adding admin
router.post('/admin/register', async(req, res)=>{
    const new_admin = new Admin(req.body)
    try{
        await new_admin.save()
        const token = await new_admin.generate_token()
        res.status(201).send({new_admin, token})
    }
    catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

//The main admin page: This route must be fetched when the admin client gets verified
router.get('/admin', authentication, async (req, res)=>{
    //send a resposne for now
    res.send({token})
    //render the admin page
    //res.render() ...
})

//register a particular person-> This is for people who cannot vote remotely
//to be removed
router.post('/admin/voter-registration',authentication, async (req, res)=>{
    //get request body for new voter info
    const voter = new Voter(req.body) //dont forget to set registered to true in the body
    try{
        await voter.save()
        //const token = await voter.generate_Token()
        res.status(201).send({voter, token})
    }
    catch(e){
        res.status(400).send()
    }
})


//add candidate
router.post('/admin/election-admin/candidate', authentication, async (req, res)=>{
    //get request body for new voter info
    const candidate = new Candidate(req.body)
    try{
        await candidate.save()
        res.status(201).send({candidate})
    }
    catch(e){
        res.status(400).send()
    }
})

//get candidates
router.get('/admin/election-admin/candidate', authentication, async (req, res)=>{
    try{
    const candidates = await Candidate.find({})
    if(!candidates){
        return res.send("No candidates")
    }
    res.status(200).send(candidates)
    }
    catch(e){
    }
})

//remove candidate
router.delete('/admin/election-admin/candidate/:party', authentication, async(req, res)=>{
    try{
    const candidate = await Candidate.findOneAndDelete({Political_party: req.params.party})
    if(!candidate){
        res.status(404).send()
    }
        res.send(candidate)
    }
    catch(e){
        res.status(500).send()
    }
})

//logout
router.post('/admin/logout', authentication, async(req, res)=>{
    try{
        // req.admin.Tokens = req.admin.Tokens.filter((token)=>{
        //     return token.token !==req.token
        // })
        //clears all web tokens
        req.admin.Tokens = []
        await req.admin.save()
        res.status(200).send()
    }
    catch(e){
        res.status(500).send
    }
})

//get all voters
router.get('/admin/voters', authentication, async(req, res)=>{
    const voters = await Voter.find({})
    if(!voters){
        return res.send("There are no voters")
    }
    res.status(200).send(voters)
})

//get all unverified voters
router.get('/admin/voters-unverified', authentication, async(req, res)=>{
    const voters = await Voter.find({Registered:false})
    if(!voters){
        return res.send("All registered voters have been verified")
    }
    res.status(200).send(voters)

})

//create an api for authenticating voter
//this is used when an admin verifies voters docs
router.patch('/admin/:id/voter-auth', authentication, async(req, res)=>{
    try{
        const voter =  await Voter.findforAdmin(req.params.id)
        if(!voter){
            throw new Error('Voter is not on the system')
        }
        voter.Registered = true
        await voter.save()
        res.send("success")
    }
    catch(e){
        res.status(400).send(e)
        console.log(e)
    }
})

//create an api for getting image of voter
router.get('/admin/voters/:id/id', async (req, res)=>{
    try{
        const voter = await Voter.findforAdmin(req.params.id)
        if(!voter){
            throw new Error()
        }

        if(!voter.Id_image){
            return res.send()
        }
        const image_data = Buffer.from(voter.Id_image, 'base64')
        console.log(image_data)
        res.set('Content-Type', 'image/png')
        res.status(200).send(image_data)
    }
    catch(e){
        console.log(e)
        res.status(404).send()
    }
})

//create an api for getting seflie of voter
router.get('/admin/voters/:id/selfie', async (req, res)=>{
    try{
        const voter = await Voter.findforAdmin(req.params.id)
        if(!voter){
            throw new Error()
        }
        if(!voter.Selfie_image){
            return res.send("1")
        }
        const image_data = Buffer.from(voter.Selfie_image, 'base64')
        console.log(image_data)
        res.set('Content-Type', 'image/png')
        res.status(200).send(image_data)
    }
    catch(e){
        res.status(404).send("There is no image available")
    }
})

module.exports = router