const express = require("express")
const bodyParser = require("body-parser")

const dbConnection = require("./Connection/db")

const path = require("path")
const cors = require("cors")

dbConnection.authenticate().then(()=>{
    console.log("DB Connection has been extablished!!!")
}).catch((err)=>{
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

app.get("/*",(req,res)=>res.sendFile(path.join(__dirname,"Public/index.html")))

app.listen(process.eventNames.PORT || 3000, ()=> console.log("Server is UP !!!"))