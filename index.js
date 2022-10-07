const express = require('express');
const app= express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000


mongoose.connect("mongodb+srv://sarshot77:776atlas@cluster0.trc860d.mongodb.net/?retryWrites=true&w=majority")

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


app.get('/users', async (req,res)=>{
    try{
        const data = await Users.find();
        res.json(data)
    }
    catch(error){
        console.log("error")
    }
})
app.get('/user/:id', async (req,res)=>{
    try{
        const _id = req.params.id;
        const data = await Users.findById(_id);
        res.json(data)
    }
    catch(error){
        console.log("error")
    }
})
app.delete('/user/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const data = await Users.findByIdAndDelete( _id)
        res.send(`Document with ${data.title} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
app.put('/user/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Users.findByIdAndUpdate(
            _id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

app.listen(port,()=>{
    console.log("started");
})
