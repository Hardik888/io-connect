import express ,{Router} from 'express';
import { createGroup,addUserToGroup } from '../controllers/groups/createGroup';
import getAllGroups from '../controllers/groups/getAllGroups'
const router: Router = express.Router();

// Route to create a new group
router.post('/groups/create', createGroup);

router.post('/addUserToGroup', addUserToGroup);
router.get('/getAllGroups',getAllGroups);
export default router;