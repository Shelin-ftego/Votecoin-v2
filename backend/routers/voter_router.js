const express = require('express')
const router = express.Router()
const Voter = require('../database_models/voter')
const Candidate = require('../database_models/candidate')
const authentication1 = require('../middleware/voter_authentication1')
const authentication2 = require('../middleware/voter_authentication2')
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

//The main voters page
router.get('/voter', authentication1, async (req, res)=>{
    //send a resposne for now
    res.send('Voters Page')
    //render the voters page
    //res.render() ...
})

//, upload_image.single('id')
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
    //const voter = await Voter.findPersonal(req.voter.National_id, req.voter.Password)
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.voter.Id_image =buffer
    await req.voter.save()
    res.send()
    }
    catch(e){
        res.status(400).send(e)  
        console.log(e)
    }
}
)


//upload a selfie
router.post('/voter/upload/selfie', authentication1, upload_image.single('self'), async(req, res)=>{
    //does not have to be here because we have authentication
    //const voter = await Voter.findPersonal(req.voter.National_id, req.voter.Password)
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
}
)


//logout
//might be more prudent to delete all of the tokens
router.post('/voter/logout', authentication1, async(req, res)=>{
    try{
        // req.voter.Tokens = req.voter.Tokens.filter((token)=>{
        //     return token.token !==req.token
        // })
        // await req.voter.save()
        // res.status(200).send()

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
//THIS STILL NEEDS TO BE TESTED
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

// router.post('/voter/vote', authentication2, async(req, res)=>{
//     try{
//         //send a resposne for now
//         res.send('You have voted')
//         //call the web3 funciton for voting
//         //
//         }
//         catch(e){
//             res.status(500).send("Blockchain API is not working")
//         }

// })

module.exports = router