const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        isFav:{
            type:Boolean,
            default:false
        },
        userId:String
    },
    {
        timestamps: true,
        strict: true
    }
);
const NotesModel = mongoose.model('Notes',NotesSchema,'UsersNotesData');
module.exports = NotesModel;