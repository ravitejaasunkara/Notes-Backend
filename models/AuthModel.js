const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        }
    },
    {
        strict:true,
        timestamps:true
    }
);
const AuthModel = mongoose.model('AuthModel',AuthSchema,'UsersLoginData');
module.exports  = AuthModel;