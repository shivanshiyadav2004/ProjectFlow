const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    studentId:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User"
    },
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    project:{
        type:String,
        required:true
    },
    description:{
         type:String,
        required:true
    },
    status:{
        type:String,
        enum:["approved","pending","rejected"],
        default:"pending"
    }
},{timestamps:true})

module.exports= mongoose.model("Project",projectSchema)