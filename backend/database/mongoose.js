const mongoose = require('mongoose')
require('dotenv').config();

mongoose.connect( process.env.MONGO, {useNewUrlParser:true, useCreateIndex:true})
const Admin = require('../database_models/admin')
const Voter = require('../database_models/voter')
const Candidate = require('../database_models/candidate')
const Voters_Roll = require('../database_models/voters_roll')

