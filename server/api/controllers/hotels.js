
import Hotel from '../models/Hotel.js'


//CREATE HOTELS
export const createHotel = async(req,res,next)=>{
    const newHotel = new Hotel(req.body);
    try {
        const saveHotel = await newHotel.save();
        res.status(200).json({message:"Create Succesfully",saveHotel});
    } catch (error) {
        next(error);
    }
}

//UPDATE HOTELS
export const updateHotels = async(req,res,next)=>{
    try {
        const updateHotel = await Hotel.findByIdAndUpdate(req.params.id,{$set:req.body});
        res.status(200).json({message:"Hotel update succesfully",updateHotel});
    } catch (error) {
       next(error);
        
    }
}



//DELETE HOTELS
export const deleteHotel = async(req,res,next)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Hotel has been deleted"})
    } catch (error) {
        next(error);
    }
}



//GET ONE HOTELS
export const gelOneHotel = async(req,res,next)=>{
    try {
        const hotelByone =  await Hotel.findById(req.params.id);
         res.status(200).json({message:"Get one Hotel",hotelByone})
     } catch (error) {
        next(error);
         
     }
}



// GET ALL HOTELS
export const getAllHotels = async(req,res,next)=>{
    try {
        const hotelAll = await Hotel.find();
        res.status(200).json({message:"Get all Hotels",hotelAll});
    } catch (error) {
        next(error);
    }
}


//FIND HOTEL BY CITIES
export const countByCities = async (req,res,next)=>{
    const cities = req.query.cities.split(",");
    try {
        const list = await Promise.all(cities.map(city=>{
            return Hotel.countDocuments({city:city});
        }))
        res.status(200).json(list);
    } catch (error) {
        next(error);
        
    }
}

export const countByType = async (req, res, next) => {
    try {
      const hotelCount = await Hotel.countDocuments({ type: "hotel" });
      const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
      const resortCount = await Hotel.countDocuments({ type: "resort" });
      const villaCount = await Hotel.countDocuments({ type: "villa" });
      const cabinCount = await Hotel.countDocuments({ type: "cabin" });
  
      res.status(200).json([
        { type: "hotel", count: hotelCount },
        { type: "apartments", count: apartmentCount },
        { type: "resorts", count: resortCount },
        { type: "villas", count: villaCount },
        { type: "cabins", count: cabinCount },
      ]);
    } catch (err) {
      next(err);
    }
  };