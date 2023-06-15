const express=require("express");
const router=express.Router();
const User=require("../models/User")
const session=require("express-session")
const config=require("../config/config")
const auth=require("../middlewares/auth")
const multer = require("multer");


// router.use(session({secretconfig.sessionSecret}))

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        return cb(null,"uploadfiles/")
    },
    filename:(req,file,cb)=>{
        return cb(null,file.originalname)
    }
})

const upload = multer({ storage:storage });





// Routers
const UserController=require("../controllers/UserController")


//----------------------------

//Get request 
// router.get("/data",auth.verifyJwt,UserController.Getdata)
router.get("/data",UserController.Getdata)


router.post("/upload",upload.single("file"),UserController.Upload)
// router.post("/upload",upload.single("file"),(req,res,next)=>{
//     console.log(req.file,"upp");
//     console.log(req.body,"body");
//     res.json(req.file)
// })


router.get("/allfiles",UserController.FilesAllData)
router.get("/allfiles/:id",UserController.FileSingleData)
router.get("/download/:filename",(req, res) => {
    const file = `uploadfiles/${req.params.filename}`;
    res.download(file);
  });


// router.get("/",UserController.Getdata)

//singup User 
// router.post("/newuser",auth.isLogin,UserController.Adduser)
router.post("/signup",UserController.Adduser)

//email verify after signup route
router.get("/verify",UserController.verifyMail)

//verify login
router.post("/login",UserController.verifyLogin)



//forgot pass
router.post("/forgotpass",UserController.forgotpass)

//verify password mail
router.get("/forgotpasswordLoad",UserController.forgotpasswordLoad)

//set new password
router.post("/resetpass",UserController.resetpass)



//user logout
router.get("/logout",auth.destroyJwt,UserController.userlogout)

//find byid
router.get("/users/:id",UserController.FindUser)

//Update user info
router.put('/update/:id',UserController.UpdateUser)

//Delete user data
router.delete('/delete/:id',UserController.DeleteUser)




//----------------------------



module.exports=router