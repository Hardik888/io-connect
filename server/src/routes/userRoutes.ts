import express, { Router } from "express";
import { createUser } from '../controllers/user/createUser';
import getAllUsers from "../controllers/user/getUser";
const router: Router = express.Router();

router.post('/create', createUser);
router.get('/getusers',getAllUsers);
export default router;
