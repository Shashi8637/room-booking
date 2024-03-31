import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    type:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    distance:{
        type:String,
        require:true
    },
    photos:{
        type:[String],
        require:false
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        require:false
    },
    room:{
        type:[String],
    },
    chepestPrice:{
        type:Number,
        require:true
    },
    feature:{
        type:Boolean,
        require:false
    }
});

export default mongoose.model("Hotel",HotelSchema);