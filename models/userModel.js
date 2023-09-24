// const mongoose = require('mongoose')
// const Schema = mongoose.Schema
// const userSchema =new Schema({
//     phone :{type:String,requird:true},
//     img :{type:String,requird:true},
//     name :{type:String,requird:true},
//    activated : {type:Boolean,requird:false, default:false} 

// })

// module.exports = mongoose.model('user-Anony',userSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    phone: { type: String, required: false },
    Name: { type: String, required: false },
    Img: { type: String, required: false },

    activated: { type: Boolean, required: false, default: false },
})

module.exports = mongoose.model('user-Anony',userSchema)