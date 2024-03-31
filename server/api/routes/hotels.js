import express from 'express';
import { countByCities, countByType, createHotel, deleteHotel, gelOneHotel, getAllHotels, updateHotels } from '../controllers/hotels.js';
import { verifyAdmin} from '../utils/verifyToken.js';


const router = express.Router();


//CREATE
router.post("/",verifyAdmin,createHotel); 

//UPDATE
router.put("/:id",verifyAdmin,updateHotels);

//DELETE
router.delete("/:id",verifyAdmin,deleteHotel);

//Get one
router.get("/find/:id",gelOneHotel);

//Get All
router.get("/",getAllHotels);
router.get("/countbycities",countByCities);
router.get("/countbytype",countByType);






export default router