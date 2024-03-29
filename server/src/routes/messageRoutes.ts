import express ,{Router}from 'express';
import {createMessage} from '../controllers/messages/createMessage';

const router: Router = express.Router();

router.post('/messages/create',createMessage);

export default router;