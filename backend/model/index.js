const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
    },
    pass:{
        type:String,
        required:true,
        select:false,
    },

    createdAt:{
        type:Date,
        default:Date.now,
    }

})

const User = mongoose.model('User', userSchema)
module.exports = User;