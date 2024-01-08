const express = require("express");
const mongoose = require("mongoose");
const user = require("./models/User");
require ("dotenv").config({path: "./config/.env"});
const app = express();
app.use(express.json());

//---@Connect database using Mongo ATLAS to the server---
const URI = process.env.MONGO_URI ;
mongoose.connect(URI)
        .then( () => console.log("connected to database with succes"))
        .catch((err) => console.log("connection failed", err));



//-------@Creating four routes------
//@Method:POST
app.post("/user",  async (req,res)=>{
    try{
        const createUser = new user(req.body)
        await createUser.save()
        res.status(201).json({msg:"user created ",createUser})
    } catch (err) {
        res.status(500).json({msg:"method failed to create user",err})
    };
})


//@Method:GET
app.get("/users", async (req,res)=>{
    try{
        const users = await user.find()
        res.status(200).json({msg:"list of users", users})
    }catch (err) {
        res.status(500).json({msg:"method failed  to read all users",err})
    };
})


//@Method:PUT
//@params:id
app.put('/user/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const updateField = req.body;
        const updateUser = await user.findByIdAndUpdate(id,updateField, { new: true });
        res.status(200).json({msg: "user updated succesfully:", updateUser})
    }catch (err) {
        res.status(500).json({msg:"method failed  to update user  ",err})
    };
})


//@Method:DELETE
//@params:id
app.delete('/user/:id', async (req,res)=>{
    try{
        const id= req.params.id;
        const deleteUser = await user.findByIdAndDelete(id);
        res.status(200).json({msg:"user removed", deleteUser})
    }catch (err) {
        res.status(500).json({msg:"method failed  to remove user  ",err})
    };
} )


//---@create a server---
const port = process.env.PORT || 8081 ;
app.listen(port, ()=>{console.log("server runnig on port :", port)});