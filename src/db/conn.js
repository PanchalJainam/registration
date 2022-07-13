const mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/registerdemo")
.then(()=>{console.log("connection successfully")})
.catch((e)=>console.log(e));