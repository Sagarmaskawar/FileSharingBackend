import mongoose from "mongoose";


const userSchema= mongoose.Schema({
    userName:{
        type:String,
        required:true
    },
    password:{
        type: Number,
        required:true
    },
})

const Registerusers = mongoose.model('users',userSchema);

export default Registerusers;