const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const notesController = require('./controllers/NotesController');
const authController = require('./controllers/AuthController');
app.use(bodyParser.json());
app.use(cors());
app.get('/',(req,res) => {
    res.json({result:"Hello..!"})
})
app.get('/allNotes',notesController.getAllSavedNotes);
app.post('/createNote',notesController.saveNewNote);
app.get('/notes/:noteId',notesController.getSingleNote);
app.patch('/notes/:noteId',notesController.updateNote);
app.delete('/notes/:noteId',notesController.deleteNote);
app.post('/auth/signup',authController.signup);
app.post('/auth/login',authController.login);
app.patch('/notes/favourites/:noteId',notesController.favourites);
app.get('/favnotes/:userId',notesController.getAllLikedNotes);
app.get('/notes/user/:userId',notesController.getNoteByUserId);
app.get('/*',(req,res) => {
    res.status(404).json({error:'No data here'});
})
module.exports = app;
