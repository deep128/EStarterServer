import express from "express"
import bcrypt from "bcrypt"
import jwt, { Secret } from "jsonwebtoken"
import {Op} from "sequelize"
import UserModel from "../Models/UserModel"

const router = express.Router()

require("dotenv").config()

//Register api

router.post("/register",(req:any,res:any)=>{
    const {username,password,email,firstname,lastname} = req.body
    if(username == undefined || username == ''
    || password == undefined || password == ''
    || email == undefined || email == ''
    || firstname == undefined || firstname == ''
    || lastname == undefined || lastname == '') {
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
        }).then((value:any)=>{
            if(value === null) {
                //No match found
                bcrypt.genSalt(10, function(err:unknown,salt:string){
                    bcrypt.hash(password,salt,(err:unknown,hash:string)=>{
                        UserModel.create({
                            firstname,lastname,username,email,password:hash
                        }).then((value:unknown)=>{
                            res.status(201).json({
                                message:"New account has been created",
                                status:res.statusCode
                            })
                        }).catch((err:unknown)=>res.status(404).json({
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

router.post("/login",(req:any,res:any)=>{
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
            where: {
                [Op.or]: [
                    {email:{[Op.eq]: username}},
                    {username: {[Op.eq]:username}}
                ]
            }
        }).then((value:any)=>{
            if(value === null) {
                //No match found
                res.status(401).json({
                    message:"Invalid username or password",
                    status: res.statusCode
                })
            } else {
                const dbPassword = value.getDataValue("password")
                bcrypt.compare(password,dbPassword,function(err:unknown,result:unknown) {
                    if(result) {
                        //if password is correct, sending web token
                        const userDetail = {
                            name: value.getDataValue("username"),
                            id:value.getDataValue("id")
                        }

                        let token:string = ""
                        if(typeof process.env.secret_key == 'string') {
                            token = jwt.sign(userDetail,process.env.secret_key,{expiresIn:"60s"})
                        }

                        if(token.length > 0)
                            res.status(200).json({
                                message:"Login success",
                                status:res.statusCode,
                                token
                            })
                        else
                            res.status(401).json({
                                message:"Login failed",
                                status:res.statusCode,
                                token
                            })
                    }
                    else {
                        res.status(401).json({
                            message:"Invalid username or password",
                            status:res.statusCode
                        })
                    }
                })
            }
        })
    }
})

module.exports = router