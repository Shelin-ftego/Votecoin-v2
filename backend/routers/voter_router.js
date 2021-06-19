const express = require('express')
const router = express.Router()
const Voter = require('../database_models/voter')
const Candidate = require('../database_models/candidate')
const authentication1 = require('../middleware/voter_authentication1')
const authentication2 = require('../middleware/voter_authentication2')
const multer = require('multer')
const sharp = require('sharp')
router.use(express.json())

//multer function for images
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

//remote registration for voters; note, that there will be a compulsory option for submitting a pciture
router.post('/voter/register', async(req, res)=>{
    const new_voter = new Voter(req.body)
    try{
        await new_voter.save()
        const token = await new_voter.generate_token()
        res.status(201).send({token})
    }
    catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

//upload an id image
router.post('/voter/upload/id', authentication1, upload_image.single('id'), async(req, res)=>{
    try{
    //does not have to be here because we have authentication
        const buffer = await sharp(req.file.buffer).png().toBuffer()
        req.voter.Id_image =buffer
        await req.voter.save()
        res.send()
    }
    catch(e){
        console.log(e)
        res.status(400).send(e)  
    }
})


//upload a selfie
router.post('/voter/upload/selfie', authentication1, upload_image.single('self'), async(req, res)=>{    
    try{
        const buffer = await sharp(req.file.buffer).png().toBuffer()
        req.voter.Selfie_image =buffer
        await req.voter.save()
        res.send()
    }
    catch(e){
        res.status(400).send(e) 
        console.log(e) 
    }
})

//logout
router.post('/voter/logout', authentication1, async(req, res)=>{
    try{
        req.voter.Tokens = []
        await req.voter.save()
        res.status(200).send()
    }
    catch(e){
        res.status(500).send
    }
})

//IDEA: Have to different authentication functions: one for users that haven;t been verified yet, and one for those who have 
//voting page

//get candidates
router.get('/voter/get-candidates', authentication1, async (req, res)=>{
    try{
    const candidates = await Candidate.find({})
    if(!candidates){
        return res.send("No candidates")
    }
    res.status(200).send(candidates)
    console.log(candidates)
    }
    catch(e){
        console.log(e)
    }
})

//create an api for getting seflie of voter
router.get('/admin/candidate/:party/image', async (req, res)=>{
    try{
        const candidate = await Candidate.find({Political_party:req.params.party})
        if(!candidate){
            throw new Error()
        }
        if(!voter.Selfie_image){
            return res.send("no image")
        }
        const image_data = Buffer.from(candidate.Candidate_image, 'base64')
        res.set('Content-Type', 'image/png')
        res.status(200).send(image_data)
    }
    catch(e){
        res.status(404).send("There is no image available")
    }
})


router.patch('/voter/vote', authentication2, async (req, res)=>{
    try{
        if(req.voter.Voted){
            throw new Error('You have already voted')
        }
        req.voter.Voted = true
        await req.voter.save()
        res.send("voted")
    }
    catch(e){
        res.status(400).send(e)
        console.log(e)
    }
})

module.exports = router