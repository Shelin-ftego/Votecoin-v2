//This middleware function checks if the webtoken matches the corresponding id and token(after decoding)
const webtoken = require('jsonwebtoken')
const Admin = require('../database_models/admin')
const admin_auth = async (req, res, next)=>{
    try{
        //get the web token
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded_admin = webtoken.verify(token, process.env.token_string) 
        //check if there is an admin with the id
        const admin = await Admin.findOne({Admin_id:decoded_admin.Admin_id, 'Tokens.token':token})  //use another id

        if(!admin){
            throw new Error('User can not be authenticated')
        }
        req.token = token
        req.admin = admin
        next()

    }
    catch(e){
        res.status(401).send({error: 'Authentication is needed.', Actual:e})
        console.log(e)
    }
}

module.exports = admin_auth