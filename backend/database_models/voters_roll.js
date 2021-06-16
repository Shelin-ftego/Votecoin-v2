const mongoose = require('mongoose')
const validator = require('validator')
const voters_roll_schema = new mongoose.Schema({
    Register_index:{
        type: Number
        ,default: 0
    }
    ,Voted_index:{
        type: Number
        ,default: 1
    }
    ,Eastern_Cape:{
        type: [Number]
        ,default: [0,0] 
    }
    ,Free_State:{
        type: [Number]
        ,default: [0,0] 
    }
    ,Gauteng:{
        type: [Number]
        ,default: [0,0] 
    }
    ,KwaZulu_Natal:{
        type: [Number]
        ,default: [0,0] 
    }
    ,Limpopo:{
        type: [Number]
        ,default: [0,0] 
    }
    ,Mphumalanga:{
        type: [Number]
        ,default: [0,0] 
    }
    ,Northern_Cape:{
        type: [Number]
        ,default: [0,0] 
    }
    ,North_West:{
        type: [Number]
        ,default: [0,0] 
    }
    ,Western_Cape:{
        type: [Number]
        ,default: [0,0] 
    }
})

const Voters_Roll = mongoose.model('Voters_Roll', voters_roll_schema)

module.exports = Voters_Roll