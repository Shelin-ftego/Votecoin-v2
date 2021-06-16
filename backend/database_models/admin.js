const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const validator = require('validator')
//encryption and token modules
const bcrypt = require('bcryptjs')
const webtoken = require('jsonwebtoken')
//const { ifError } = require('assert')

const admin_schema = new mongoose.Schema({
    Admin_id:{
        type: String,
        required: true,
        unique:true
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
    ,Password:{
        type: String,
        required: true,
        minlength: 8
    }
    ,Tokens:[
        {token:{
            type:String
            ,required:true
        }}
    ]
})

//Customized methods for the model
//find a user based on defined parameter (in this case the admin id and password)
admin_schema.statics.findPersonal = async(admin_id, password)=>{
    const admin = await Admin.findOne({Admin_id:admin_id})
    //if the admin does not exists, return an error
    if(!admin){
        throw new Error("These credentials are invalid")
    }
    
    const validPassword =  await bcrypt.compare(password, admin.Password)
    if(!validPassword){
        throw new Error("Invalid Password")
    }
    //if all the credential are correct, return the user
    return admin
}

//Customized methods for model instances
//create a webtoken
admin_schema.methods.generate_token = async function(){
//sign the web token using admin id
const token = webtoken.sign({Admin_id:this.Admin_id.toString()}, process.env.token_string,{ expiresIn:'3h' })
this.Tokens = this.Tokens.concat({token:token})
//save changes
await this.save()
return token //this is just used for debugging purposes
}

//method for 'pre-processing'
//hash the password if is a new instance/ password is being changed
admin_schema.pre('save', async function(next){
    //check if the password is new/modified
    if(this.isModified('Password')){
        //perform 8 rounds of hashing
        this.Password = await bcrypt.hash(this.Password, 8)
        next()
    }
})

//JSON method
admin_schema.methods.toJSON = function(){
    const userObj = this.toObject()
    delete userObj.Password
    delete userObj.Tokens
    return userObj
}

const Admin = mongoose.model('Admin', admin_schema)

module.exports = Admin
