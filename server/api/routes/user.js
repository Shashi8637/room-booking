import express from 'express';
import {updateUsers,deleteUser,gelOneUser,getAllUsers} from '../controllers/user.js';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

//UPDATE
router.put("/:id",verifyUser,updateUsers);

//DELETE
router.delete("/:id",verifyUser,deleteUser);

//Get one
router.get("/:id",verifyUser,gelOneUser);

//Get All
router.get("/",verifyAdmin,getAllUsers);




export default router