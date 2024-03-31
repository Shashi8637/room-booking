
import User from "../models/user.js"

//UPDATE UserS
export const updateUsers = async(req,res,next)=>{
    try {
        const updateuser = await User.findByIdAndUpdate(req.params.id,{$set:req.body});
        res.status(200).json({message:"User update succesfully",updateuser});
    } catch (error) {
       next(error);
        
    }
}



//DELETE UserS
export const deleteUser = async(req,res,next)=>{
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"User has been deleted"})
    } catch (error) {
        next(error);
    }
}



//GET ONE UserS
export const gelOneUser = async(req,res,next)=>{
    try {
        const UserByone =  await User.findById(req.params.id);
         res.status(200).json({message:"Get one User",UserByone})
     } catch (error) {
        next(error);
         
     }
}



// GET ALL UserS
export const getAllUsers = async(req,res,next)=>{
    try {
        const UserAll = await User.find();
        res.status(200).json({message:"Get all Users",UserAll});
    } catch (error) {
        next(error);
    }
}