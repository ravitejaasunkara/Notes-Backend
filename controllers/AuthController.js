const authModel = require('./../models/AuthModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//csignup a user
exports.signup = async (req,res) => {
    const password = await bcrypt.hash(req.body.password,saltRounds);
    const data = {...req.body,password};
    const userExist = await authModel.find({email:req.body.email});
    if(userExist.length > 0){
        res.status(400).json({error:'Email already exists',status:false});
    }else{
        try{
            await authModel.create(data);
            const user = await authModel.find({email:req.body.email});
            res.status(200).send({result:'User created',status:true,userId:user._id});
        }catch(err){
            res.status(404).send({error:err,status:false});
        }
    }
}

//checks for user login existence
exports.login = async(req,res) => {
    const data = req.body;
    const userCheck = await authModel.findOne({email:req.body.email});
    if(userCheck == null){
        res.status(404).json({error:'User not found',status:false});
        return;
    }if(!(await bcrypt.compare(req.body.password,userCheck.password))){
        res.status(404).json({error:'Password mismatch',status:false});
        return;
    }
    res.status(200).json({result:"Authentication success",userId:userCheck._id,status:true,userName:userCheck.username});
}
