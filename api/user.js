const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Op = require("sequelize").Op
const router = express.Router()

const UserModel = require("../Models/UserModel")

require("dotenv").config()

//Register api

router.post("/register",(req,res)=>{
    const {username,password,email} = req.body
    if(username == undefined || username == ''
    || password == undefined || password == ''
    || email == undefined || email == '') {
        res.status(401).json({
            message:"Fill all fields",
            status:res.statusCode
        })
    } else {

        //Check if username or email already registered
        UserModel.findOne({
            attributes:["username"],
            where: {
                [Op.or]: [
                    {email:{
                        [Op.eq]: email
                    }},
                    {username: {[Op.eq]:username}}
                ]
            }
        }).then((value)=>{
            if(value === null) {
                //No match found
                bcrypt.genSalt(10, function(err,salt){
                    bcrypt.hash(password,salt,(err,hash)=>{
                        UserModel.create({
                            username,email,password:hash
                        }).then((value)=>{
                            res.status(201).json({
                                message:"New account has been created",
                                status:res.statusCode
                            })
                        }).catch(err=>res.status(404).json({
                            message:"Something went wrong",
                            status: res.statusCode
                        }))
                    })
                })
            } else {
                res.status(401).json({
                    message:"Email or username already exist",
                    status: res.statusCode
                })
            }
        })
    }
})

//login api

router.post("/login",(req,res)=>{
    const {username,password} = req.body
    if(username == undefined || username == ''
    || password == undefined || password == '') {
        res.status(401).json({
            message:"Invalid credentials",
            status:res.statusCode
        })
    } else {
        //Check if username or email already registered
        UserModel.findOne({
            attributes:["password"],
            where: {
                [Op.or]: [
                    {email:{[Op.eq]: username}},
                    {username: {[Op.eq]:username}}
                ]
            }
        }).then((value)=>{
            if(value === null) {
                //No match found
            } else {
                res.status(401).json({
                    message:"Invalid username or password",
                    status: res.statusCode
                })
            }
        })
    }
})

module.exports = router