import express from "express"
import bodyParser from "body-parser"
import path from "path"
import cors from "cors"
import dbConnection from "./Connection/db"

dbConnection.authenticate().then(()=>{
    console.log("DB Connection has been extablished!!!")
}).catch((err:any)=>{
    console.log("Unable to connect db ",err)
})

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//User public folder
app.use(express.static(path.join(__dirname,"Public")))

//api route
app.use("/api/user",require("./api/user"))

app.get("/*",(req:any,res:any)=>res.sendFile(path.join(__dirname,"Public/index.html")))

app.listen(process.env.EstarterPORT || 3000, ()=> console.log("Server is UP !!!"))