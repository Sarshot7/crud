const express = require('express');
const app= express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000


mongoose.connect("mongodb+srv://sarshot77:776atlas@cluster0.trc860d.mongodb.net/?retryWrites=true&w=majoritymongodb+srv://sarshot_db:776atlaS@cluster0.k07ck2i.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log('connected')
}).catch((error)=>{
    console.log(error)
})
const Uschema = mongoose.Schema({
    title: String
})

const Users = new mongoose.model('users',Uschema)
app.use(express.json())
app.post('/users', async(req,res)=>{

    try{

        const newuser= new Users(req.body)
        const Suser = await newuser.save()
        res.send(Suser)
        console.log(res.body)
    }
    catch(error){
        console.log(error)
    }
})


app.get('/users',async(req,res)=>{
    try{
        const data = await Users.find();
        res.json(data)
    }
    catch(error){
        console.log("error")
    }
})
app.listen(port,()=>{
    console.log("started");
})