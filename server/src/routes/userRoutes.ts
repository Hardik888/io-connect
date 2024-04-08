import express, { Router } from "express";
import { createUser } from '../controllers/user/createUser';
import getAllUsers from "../controllers/user/getUser";
import LoginUser from "../controllers/user/LoginUser";
import verifytoken from '../Middleware/authentication';
const router: Router = express.Router();


router.post('/LoginUser',LoginUser);
router.post('/create', createUser);
router.get('/getusers', verifytoken, getAllUsers); 
export default router;
