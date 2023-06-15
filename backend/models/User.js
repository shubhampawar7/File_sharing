const mongoose=require("mongoose");


const LoginUserSchema=mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    email:{
        type:String,
        required : true,
        unique: true,

    },
    password:{
        type:String,
        required : true

    },
    is_admin:{
        type:Boolean,
        default:false
    },
    is_verified:{
       type:Boolean,
       default:false
    },
    token:{
        type:String,
        default:""

    }
})

module.exports=mongoose.model("User",LoginUserSchema)