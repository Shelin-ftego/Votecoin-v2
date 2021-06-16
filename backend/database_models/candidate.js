const mongoose = require('mongoose')
const validator = require('validator')
const candidate_schema = new mongoose.Schema({
    Political_party:{
        type: String,
        required: true,
        unique: true
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
            if(value<35){
                throw new Error('Candidates must be 35 years old or above to be eligible candidate.');
            }
        }
    }
    ,Party_image:{
        type: Buffer
    }
})

const Candidate = mongoose.model('Candidate', candidate_schema)

module.exports = Candidate
