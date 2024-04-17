import express ,{Router}from 'express';
import {createMessage} from '../controllers/messages/createMessage';
import verifytoken from '../Middleware/authentication';
const router: Router = express.Router();

router.post('/messages/create',verifytoken,createMessage);

export default router;