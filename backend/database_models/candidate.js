const mongoose = require('mongoose')
const validator = require('validator')
const candidate_schema = new mongoose.Schema({
    Political_party:{
        type: String,
        required: true,
        unique: true
        }
        ,Candidate_image:{
            type: Buffer
        }
    }
)
//find a voter based on national id only
candidate_schema.statics.findforAdmin = async(party)=>{
    const candidate = await Candidate.findOne({Political_party:party})
    //if the voter does not exist, return an error
    if(!candidate){
        throw new Error("These credentials are invalid")
    }
    //if all the credential are correct, return the user
    return candidate
}

const Candidate = mongoose.model('Candidate', candidate_schema)
module.exports = Candidate
