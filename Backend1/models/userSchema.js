const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    password:{
        type:String,
        required:true,
    
    },
    email:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Teacher" , "Student"],
        default:"Student",
        required:true
    }
})

userSchema.pre("save", async function (next){
try {
    if(!this.isModified("password")){
   return next()
}
this.password = await bcrypt.hash(this.password , 10)
next()
} catch (error) {
    console.log(error)
}

})

module.exports =mongoose.model("User" , userSchema)