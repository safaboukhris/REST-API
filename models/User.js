const mongoose = require ("mongoose");
//---@create a  userSchema ---
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type:Number,
        required: false
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:false
    }
})

module.exports = mongoose.model("User", userSchema);