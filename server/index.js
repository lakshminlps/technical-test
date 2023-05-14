const express = require('express')
const mongoose =  require('mongoose')
const app = express()
const mongo_uri='mongodb://localhost:27017/test'
const port= 3001
const UserModel= require('./models/user')
const bodyParser = require('body-parser');
mongoose.connect(mongo_uri ,{
    useNewurlParser: true
})
mongoose.connection.once('open' , ()=> console.log("connected")).on('error' ,(err)=>console.log("failed"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
    );
    next();
});
app.post('/password-strength' ,async (req,res)=>{
    const {email , passwd , strength} =req.body;
    const user = new UserModel({email : email , passwd ,strength }  )
    console.log(user)

    try{
        await user.save()
        res.status(200).json({sucess:true})
    }catch(err){
        console.log(err)
        res.send(err)
    }
})

app.listen(port ,()=>{
    console.log(`server started at port ${port}`)
})