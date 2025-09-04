const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
//mongodb+srv://rohankj77_db_user:rHbQOKQWLvc9Mso9@cluster0.y2rvtk4.mongodb.net/
mongoose.connect('mongodb+srv://rohankj77_db_user:rHbQOKQWLvc9Mso9@cluster0.y2rvtk4.mongodb.net/').then(
    ()=>{
        console.log("Connected to data base");
    }
).catch((err)=>{
    console.log("Error connecting to database", err.message);
})

//MD schema

const noteSchema = new mongoose.Schema({
    title : String,
    description : String,
})

const Note = mongoose.model('Note', noteSchema);

//api endpoints

app.get('/api/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }   
});

app.post('api/notes', async (req , res)=>{
    try{
        const note = new Note({
        title : req.body.title,
        description : req.body.description,
    });
    const savedNotes = await note.save();
    res.status(201).json(savedNotes);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }   
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})