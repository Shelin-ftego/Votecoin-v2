//This middleware function checks if the webtoken matches the corresponding id and token(after decoding)
const webtoken = require('jsonwebtoken')
const Voter = require('../database_models/voter')
const voter_auth1 = async (req, res, next)=>{
    try{
        //get the web token
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded_voter = webtoken.verify(token,  process.env.token_string)    //the 'design3' string is a random string used for token validation
        //check if there is an admin with the id
        const voter = await Voter.findOne({National_id: decoded_voter.National_id, 'Tokens.token':token})  //use another id
        if(!voter){
            throw new Error('User can not be authenticated')
        }
        //if the verificaiton documents have not been verified do not allow the voter to continue
        req.token = token
        req.voter = voter
        next()
    }
    catch(e){
        res.status(401).send({error: 'Authentication is needed.'})
        console.log(e)
    }
}
module.exports = voter_auth1
