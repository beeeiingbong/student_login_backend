const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const details = new Schema({
    rollNumber:{type:Number, required:true},
    address:{type:String, required:true},
    dateOfBirth:{type:String, required:true},
    schoolName:{type:String, required:true},
    schoolAddress:{type:String, required:true},
    createdBy: {type: Schema.Types.ObjectId, ref:'user'},
    createdOn: {type: Date, default: Date.now}
})


module.exports = mongoose.model('details',details)