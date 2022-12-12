const notesModel = require('./../models/NotesModel');
const { ObjectId } = require('mongodb');

//getting all the notes
exports.getAllSavedNotes = async (req, res) => {
    try {
        const allNotes = await notesModel.find({});
        res.status(200).json({ result: allNotes, status: true });
    } catch (err) {
        res.status(400).send({ error: err, status: false });
    }
}

/* This is a function that is used to save a new note. */
exports.saveNewNote = async (req, res) => {
    const data = req.body;
    try {
        await notesModel.create(data);
        res.status(200).json({ result: "Note saved.", status: true });
    } catch (err) {
        res.status(400).json({ error: err, status: false });
    }
}

/* This is a function that is used to get a single note by its id. */
exports.getSingleNote = async (req, res) => {
    const _id = ObjectId(req.params.noteId);
    try {
        const singleNote = await notesModel.find({ _id });
        if (singleNote.length > 0) {
            res.status(200).json({ result: singleNote, status: true });
            return;
        }
        res.status(404).json({ result: singleNote, status: false });
    } catch (err) {
        res.status(400).json({ error: err, status: false });
    }
}

/* This is a function that is used to update a note. */
exports.updateNote = async (req, res) => {
    const data = req.body;
    const _id = ObjectId(req.params.noteId);
    const note = await notesModel.findOne({ _id });
    try{
        await notesModel.updateOne({_id},{$set:data});
        res.status(200).json({"result":"Updated",status:true});
    }catch(err){
        res.status(400).json({error:err,status:false});
    }
}

/* This is a function that is used to delete a note. */
exports.deleteNote = async (req, res) => {
    const _id = ObjectId(req.params.noteId);
    try{
        const data = await notesModel.find({ _id });
        if(data.length == 0){
            res.status(404).json({error:'No data found with ID',status:false});
            return;
        }else{
            await notesModel.deleteOne({_id});
            res.status(200).json({ result: "Note deleted.!", status: true });
            return;
        }
    }catch(err){
        res.status(400).json({error:err,status:false});
    }
}

/* This is a function that is used to update the isFav property of a note. */
exports.favourites = async(req,res) => {
    const _id = ObjectId(req.params.noteId);
    try{
        const data = await notesModel.find({_id});
        await notesModel.updateOne({_id},{$set:{isFav:req.body.isFav}});
        res.status(200).json({result:"Success",status:true});
    }catch(error){
        res.status(400).json({error:err,status:false});
    }
}

/* This is a function that is used to get all the notes that are liked. */
exports.getAllLikedNotes = async(req,res) => {
    try{
        const favNotes = await notesModel.find({isFav:true,userId:req.params.userId});
        res.status(200).json({result:favNotes,status:true});
    }catch(err){
        res.status(400).json({error:err,status:false});;
    }
}

//this will give all the notes belongs to a particular user
exports.getNoteByUserId = async(req,res) => {
    try{
        const userNotes = await notesModel.find({userId:req.params.userId});
        if(userNotes.length != 0){
            res.status(200).json({result:userNotes,status:true});
        }else{
            res.status(404).json({result:'No data',status:false});
        }
    }catch(err){
        res.status(400).json({error:err,status:false});
    }
}
