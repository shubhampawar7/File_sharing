const express=require("express");
const bcrypt=require("bcrypt")
const nodemailer=require("nodemailer")
const jwt =require("jsonwebtoken")
const config=require("../config/config")
const User=require("../models/User");
const session=require("express-session")



//Fetch user data
const Getdata=async(req,res)=>{
    try {
        const data= await User.find({is_admin:true});
        console.log(data)
        res.json(data)
        
    } catch (error) {
        console.log(error)
        
    }
}

//Add New admin
const Add=async(req,res)=>{
    try {
        const securepass=await securePassword(req.body.password);

        const newadmin=new User({
            name:req.body.name,
            email:req.body.email,
            password:securepass,
            is_admin:false,
            is_verified:false
          
        })
        const admin=await newadmin.save();

        if(admin){
            adminverifyMail(req.body.name,req.body.email,admin._id)
            res.json(admin)


        }
        else{
            res.json({message:"error"})
        }
        
    } catch (error) {
        console.log(error.message)
        
    }
}

const securePassword=async(password)=>{
    try {
        const passwordHash=await bcrypt.hash(password,10)
        return passwordHash
        
    } catch (error) {
        console.log(error.message)
    }
}

const adminverifyMail=async(name,email,email_id)=>{
    try {
        const myObjectIdString = email_id.toString();
        // console.log(myObjectIdString)
        // console.log(user_id)

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: config.email,
                pass: config.Password
            },
        });
        const mailOptions={
            from:config.email,
            to:config.adminMail,
            subject:"Requesting for admin login ",
            // html: `<h1>Hi ,`+name+`</h1><p>please click here to verify <a href="http://127.0.0.1:7000/verify?id=`+user_id+`" >your mail</a></p>`
            html: `<h1>`+name+` is requesting for admin login and email id :`+email+`</h1><p>please click here to verify <a href="http://127.0.0.1:7000/admin/verify?id=`+myObjectIdString+`" >your mail</a></p>`
        }
        console.log(mailOptions.html)

        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log("error",error);
            }
            else{
                console.log("email sent"+info.response);
                res.status(201).json({status:201,info});            }
            })



    } catch (error) {
        console.log(error)
        
    }
}

const verify=async(req,res)=>{
    try {
        console.log(req.query.id,"query id")
        // res.send("heelo")

        const updateAdminData=await User.findOneAndUpdate(req.query.id,{is_admin:true,is_verified:true},{new:true});
        // res.json(updateAdminData,{msg:"verify admin succesfully"});
        res.json(updateAdminData);
    } catch (error) {
        console.log(error.message)
    }
}

const login=async(req,res)=>{
    try {
        const email=req.body.email;
        const password=req.body.password;

        const Checkadmin=await User.findOne({email:email});

        if(Checkadmin){
            const passwordMatch=await bcrypt.compare(password,Checkadmin.password);
            if(passwordMatch){
                const token=await jwt.sign({email,password},"admin login",{expiresIn:"1 Day"})
                res.status(200).json({
                    email:email,
                    password:password,
                    token:token
                })
                console.log(token)
                console.log("pass is correct")

            }
            else
            {
                res.json({msg:"invalid password"})


            }

        }
        else{
                       res.json({msg:"invalid email"})

        }
        
    } catch (error) {
        console.log(error.message);
    }
}


//update admin byid
const Update=async(req,res)=>{
    try {
        const securepass=await securePassword(req.body.password);
        const UpdateUser=await User.findById(req.params.id)
        UpdateUser.name=req.body.name
        UpdateUser.email=req.body.email
        UpdateUser.password=securepass

        const newdata=await UpdateUser.save()
        res.json(newdata)
       
    } catch (error) {
        console.log(error)
    }
}

//delete admin
const Delete=async(req,res)=>{
      try {
        const deleteUser=await User.findById(req.params.id)
        const deletedData=await User.findByIdAndRemove(deleteUser);
        res.json(deletedData)
    } catch (error) {
        console.log(error.message)
        console.log("error")
    }
}



module.exports={Getdata,Add,verify,login,Update,Delete}