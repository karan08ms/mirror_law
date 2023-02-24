const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express();

///connect mongodb database 
mongoose.set('strictQuery' , false)
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser:true,
    useUnifiedTopology:false
}).then(()=>{
    console.log("เชื่อมต่อเรียบร้อย")
})
.catch((err)=>{
    console.log(err)

})
app.use((req,res,next) =>{
    res.header('Access-Control-Allow-Origin' , '*')
    res.header('Access-Control-Allow-Headers' , 'Origin, X-Requested-With , Content-Type , Accept')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})
//middleware
app.use(express.urlencoded({extended:false}))//เพื่อการส่งข้อมูลในรูปแบบของ post method ให้ใช้คำสั่ง request body ได้
app.use(express.json());//เพื่อที่จะได้ส่งข้อมูลเป็น Rawdata ได
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

//route
app.get("*" , (req , res)=>{
    res.json({
        data : `ข้อความจาก Server ` 
    })
    console.log("เชื่อมต่อเรียบร้อย")
})

const port = process.env.PORT || 8080
app.listen(port , ()=>console.log(`start server in port ${port}`))