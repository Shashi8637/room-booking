import User from "../models/user.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";


//REGISTRATION USER AUTH
//REGISTRATION USER AUTH
export const register = async(req,res,next)=>{
    try {
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username:req.body.username,
            password:hash,
            email:req.body.email
        })
        await newUser.save();
        res.status(200).json({message:"Successfully create User",newUser});
        
    } catch (error) {
        next(error);
    }
}

//LOGIN USER AUTH
export const login = async(req,res,next)=>{
    try {

        //compare with Username
       const user = await User.findOne({username:req.body.username});
       if(!user) return next(createError(404,"User not found"));



       //compare with password that is bcrypt password`
        const isPasswordCorrect = await bcrypt.compare(req.body.password,user.password);
        if(!isPasswordCorrect) return next(createError(400,"Wrong Password"));

        const token = jwt.sign({id:user._id, isAdmin:user._isAdmin},process.env.JWT);

        //hiding the admin and password
       const {password,isAdmin,...otherDetails} = user._doc;
       res.cookie("access_token",token,{
        httpOnly:true,
       })
       .status(200)
       .json({...otherDetails});
     
    } catch (error) {
        next(error);
    }
}
