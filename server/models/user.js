const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  
    email:{
        type : String,
        required: true
    },
    passwd:{
        type: String,
        required: true
    } ,
    strength:{
        type: String,
        required: true
    }

})
const UserModel= mongoose.model("users" , UserSchema , "User")

module.exports = UserModel