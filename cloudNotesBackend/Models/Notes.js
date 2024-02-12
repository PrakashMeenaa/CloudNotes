import mongoose, { Mongoose } from 'mongoose';
const { Schema } = mongoose;

const NotesSchema = new Schema({
     title:{
        type:String,
        required:true
     },
     description:{
        type:String,
        required:true,
        
     },
     tag:{
        type:String,
        defaultL:"General"
     },
     date:{
        type:Date,
        default:Date.now
     }
});

module.exports = Mongoose.Model('Notes', NotesSchema)