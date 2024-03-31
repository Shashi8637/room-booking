import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";



//CREATE
export const createRoom =async(req,res,next)=>{
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {
                $push: { rooms: savedRoom._id },
              });
        } catch (error) {
            next(error);
        }
        res.status(200).json({message:"succesful",savedRoom});
    } catch (error) {
        next(error);
    }
}


//UPDATE
export const updateRoom = async(req,res,next)=>{
    try {
    const updatedRoom = await Room.findByIdAndUpdate(req.params.id,{$set:req.body,new:true});
    res.status(200).json(updatedRoom);
    } catch (error) {
        next(error);
    }

}


//CHECK ROOM AVAILABLE OR NOT
export const isRoomAvailable = async(req,res,next)=>{
    try {
        await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
                $push: {
                  "roomNumbers.$.unavailableDates": req.body.dates
                },
            }
        );
        res.status(200).json("Room has been updated");
    } catch (error) {
        next(error);
    }
}



//DELETE ROOM UPDATE
export const deleteRoom = async(req,res,next)=>{
    const hotelId = req.params.hotelid;
    try {
         await Room.findByIdAndDelete(req.params.id);
            try {
                await Hotel.findByIdAndUpdate(hotelId,{
                    $pull: { rooms: req.params.id }
                });
            } catch (error) {
                next(error);
                
            }
            res.status(200).json("Successfully deleted room");
        
    } catch (error) {
        next(error);
    }
}



//GET ONE ROOM
export const getOneRoom = async(req,res,next)=>{
    try {
        const getRoom = await Room.findById(req.params.id);
        res.status(200).json({message:"Rooms are shown successfully",getRoom});
    } catch (error) {
        next(error);
    }
}




//GET ALL ROOMS
export const getAllRooms = async(req,res,next)=>{
    try {
        const getRooms = await Room.find();
        res.status(200).json({message:"here is all rooms",getRooms});
    } catch (error) {
        next(error);
    }
    
}

