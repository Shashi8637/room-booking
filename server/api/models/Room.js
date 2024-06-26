import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    maxPeople:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    roomNumbers:[{number:Number,unavailableDate:{type:[Date]}}],
},{ timestamps: true });

export default mongoose.model("Room",RoomSchema);