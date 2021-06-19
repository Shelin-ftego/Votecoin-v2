const mongoose = require('mongoose')
const validator = require('validator')
const candidate_schema = new mongoose.Schema({
    Political_party:{
        type: String,
        required: true,
        unique: true
        }
    }
)

const Candidate = mongoose.model('Candidate', candidate_schema)
module.exports = Candidate
