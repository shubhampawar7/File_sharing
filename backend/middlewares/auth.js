const express=require("express")
const jwt =require("jsonwebtoken")
var redis = require('redis');
var JWTR =  require('jwt-redis').default;
var redisClient = redis.createClient({
    legacyMode: true
});
var jwtr = new JWTR(redisClient);

const isLogin=async(req,res,next)=>{ 
    //next will check auth is correct n then go to next process
    try {
        if(req.session.user_id){
                res.json({msg:"redirect (/login) to same page( already logged in)"})

        }
       
        next();
        
    } catch (error) {
        console.log(error.message)
    }

}

const isLogout=async(req,res,next)=>{ 
    //next will check auth is correct n then go to next process
    try {
        if(req.session.user_id){
            res.json({msg:"redirect (/home)to home page"})

    }
    next();

        
    } catch (error) {
        console.log(error.message)
    }

}

const verifyJwt=async(req,res,next)=>{
    try {
        let token=req.headers.authorization.split(" ")[1];
        // console.log(token)
        const verifytoken= jwt.verify(token,"iamfromindiamynameisshubham");
        next();        
        // res.json(token)
       

    }
     catch (error) {
        console.log(error.message,":verify jwt error");
        res.json({msg:"jwt token is not verified"})
    }
   
}

const destroyJwt=async(req,res,next)=>{
    try {
         token=req.headers.authorization.split(" ")[1];
        console.log(token)     
        res.json({token:token,msg:"token deletedd"})   
        jwtr.destroy(token)
               next();       

    }
     catch (error) {
        console.log(error.message,":verify jwt error");
    }
   
}

module.exports={isLogin,isLogout,verifyJwt,destroyJwt}