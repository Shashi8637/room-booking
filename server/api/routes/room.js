import express from 'express';
import { createRoom, updateRoom,isRoomAvailable,deleteRoom,getOneRoom,getAllRooms } from '../controllers/room.js';
import {verifyAdmin} from "../utils/verifyToken.js"

const router = express.Router();

//CREATE
router.post("/:hotelid",verifyAdmin,createRoom);

//UPDATE
router.put("/availability/:id",isRoomAvailable);
router.put("/:id",verifyAdmin, updateRoom)

//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

//Get one
router.get("/:id/",getOneRoom);

//Get All
router.get("/",getAllRooms)


export default router