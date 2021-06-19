const mongoose = require('mongoose')
const validator = require('validator')
//encryption and token modules
const bcrypt = require('bcryptjs')
const webtoken = require('jsonwebtoken')
const address_schema = new mongoose.Schema({
    Province:{
        type: String,
        required: true
    }
    ,Municipality:{
        type: String,
        required: true
    }
    ,Ward:{
        type: String,
        required: true
    }
    ,District:{
        type: String,
        required: true
    }
})

const voter_schema = new mongoose.Schema({
    National_id:{
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(value.length!=13){
                throw new Error('Your ID should be 13 digits');
            }
            if(!validator.isNumeric(value)){
                throw new Error('Your name should only contain digits');
            }
        }
    }
    ,Name:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error('Your name should only contain letters');
            }
        }
    }
    ,Surname:{
        type: String,
        required: true,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error('Your surname should only contain letters');
            }
        }
    }
    ,Age:{
        type: Number,
        required: true,
        validate(value){
            if(value<18){
                throw new Error('This individual is underage.');
            }
        }
    }
    ,Date_of_Birth:{
        type:String,
        required: true,
        validate(value){
            if(!validator.isDate(value)){
                throw new Error("Date entered is invalid. Check formatting: YYYY/MM/DD")
            }
        }
    }
    ,Address:{
        type: address_schema,
        required:true
    }
    ,Password:{
        type: String,
        required: true,
        minlength: 8,
    }
    ,Registered:{
        type: Boolean,
        default: false
    }
    ,Voted:{
        type: Boolean,
        default: false
    }
    ,Tokens:[
        {token:{
            type:String
            ,required:true
        }}
    ]
    ,Id_image:{
        type: Buffer
    }
    ,Selfie_image:{
        type: Buffer
    }
},{
    timestamps:true
})

//Customized methods for the model
//find a voter based on defined parameter (in this case the national id and password)
voter_schema.statics.findPersonal = async(national_id, password)=>{
    const voter = await Voter.findOne({National_id:national_id})
    //if the voter does not exist, return an error
    if(!voter){
        throw new Error("These credentials are invalid")
    }
    
    const validPassword =  await bcrypt.compare(password, voter.Password)
    if(!validPassword){
        throw new Error("Invalid Password")
    }
    //if all the credential are correct, return the user
    return voter
}

//find a voter based on national id only
voter_schema.statics.findforAdmin = async(national_id)=>{
    const voter = await Voter.findOne({National_id:national_id})
    //if the voter does not exist, return an error
    if(!voter){
        throw new Error("These credentials are invalid")
    }
    //if all the credential are correct, return the user
    return voter
}

//Customized methods for model instances
//create a webtoken
voter_schema.methods.generate_token = async function(){
//sign the web token using admin id
const token = webtoken.sign({National_id:this.National_id.toString()}, process.env.token_string,{ expiresIn:'3h' })
this.Tokens = this.Tokens.concat({token:token})
//save changes
await this.save()
return token //this is just used for debugging purposes
}

//method for 'pre-processing'
//hash the password if is a new instance/ password is being changed
voter_schema.pre('save', async function(next){
    //check if the password is new/modified
    if(this.isModified('Password')){
        //perform 8 rounds of hashing
        this.Password = await bcrypt.hash(this.Password, 8)
        next()
    }
})

//JSON method
voter_schema.methods.toJSON = function(){
    const userObj = this.toObject()
    delete userObj.Password
    delete userObj.Tokens
    delete userObj.Selfie_image
    delete userObj.Id_image
    return userObj
}

const Voter = mongoose.model('Voter', voter_schema)
module.exports = Voter
