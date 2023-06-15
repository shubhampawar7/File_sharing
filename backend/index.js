const express=require("express");
const mongoose=require("mongoose")
const url="mongodb://localhost:27017/User";
var cors = require('cors')



const app=express();
app.use(cors())
const jwt =require("jsonwebtoken")

//DB CONNECTIVITY START
const connect=mongoose.connect(url,{useNewUrlParser:"true"})
.then(()=>{
    console.log("db connected ")
},
(err)=>{
    console.log("error while connecting ",err)

})  
//DB CONNECTIVITY END

app.use(express.json())

//ROUTERS START
const UserRoute=require("./routes/LoginUser")
const AdminRoute=require("./routes/AdminRoute")
//ROUTERS END


//------------------
app.use("/",UserRoute)
app.use("/admin",AdminRoute)
//------------------


app.listen(7000,()=>{
    console.log("server started on port 7000")
})



