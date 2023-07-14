const mongoose=require("mongoose");

const chatModel=monogoose.schema({
    chatName:{
        type:String
               
    },
    isGroupChat:{
        type:Boolean,
        default:false
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    latestMsg:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message"

    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})


module.exports=mongoose.model("Chat",chatModel)