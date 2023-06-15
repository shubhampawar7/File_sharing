const express=require("express");
const router=express.Router();
const User=require("../models/User")
const session=require("express-session")
const config=require("../config/config")
const auth=require("../middlewares/auth")

// Routers
const AdminController=require("../controllers/Admincontroller")


//Get request 
// router.get("/",auth.verifyJwt,AdminController.Getdata)
router.get("/",AdminController.Getdata)


//singup User 
router.post("/add",AdminController.Add)

//verify admin main
router.get("/verify",AdminController.verify)

//admin login 
router.post("/login",AdminController.login)

//Update admin info
router.put('/update/:id',AdminController.Update)

//Delete admin data
router.delete('/delete/:id',AdminController.Delete)






module.exports=router