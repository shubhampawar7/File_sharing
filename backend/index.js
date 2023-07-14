require('dotenv').config();
var cors = require('cors')
const express=require("express");
const mongoose=require("mongoose")


const app=express();

app.use(cors())


const jwt =require("jsonwebtoken")
const URL=process.env.URL;
const PORT=process.env.PORT || 7000

//DB CONNECTIVITY START
const connect=mongoose.connect(URL,{useNewUrlParser:"true"})
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
const UserChat=require("./routes/UserChat")

//ROUTERS END


//------------------
app.use("/",UserRoute)
app.use("/admin",AdminRoute)
// app.use("/chats",UserChat)

// app.get("/",(req,res)=>{
//     res.send("server start")
// })
//------------------


const server=app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})

const io=require("socket.io")(server,{
    pingTimeout:60000,
    cors:{
        origin:"http://localhost:3001",

    },

})

io.on("connection",(socket)=>{
console.log("connected to socket.io");

socket.on("join chat",(selecteduserid)=>{
    socket.join(selecteduserid)
    console.log(selecteduserid,"dddddddddddd");
    // socket.emit("connected")   
    
  

})

socket.on("new message",(message)=>{
    socket.join(message);
    console.log(message,"mssssg");
    socket.emit("message received",n)


    // message.map((m)=>{
    //     console.log(m.message,"mssssg");
    //     console.log(m,"-----------------------");
    //     // socket.in(m.sharedWith).emit("message received",m.message);
    //     socket.emit("message received",m.message)

    // })

})




})



