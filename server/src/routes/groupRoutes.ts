import express ,{Router} from 'express';
import { createGroup,addUserToGroup } from '../controllers/groups/createGroup';
import getAllGroups from '../controllers/groups/getAllGroups'
import verifytoken from '../Middleware/authentication';
const router: Router = express.Router();

// Route to create a new group
router.post('/groups/create', verifytoken, createGroup); // Apply the middleware here

router.post('/addUserToGroup', verifytoken, addUserToGroup); // Apply the middleware here
router.get('/getAllGroups', verifytoken, getAllGroups); // Apply the middleware here
export default router;