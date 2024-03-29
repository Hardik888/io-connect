import express ,{Router} from 'express';
import { createGroup,addUserToGroup } from '../controllers/groups/createGroup';

const router: Router = express.Router();

// Route to create a new group
router.post('/groups/create', createGroup);

router.post('/addUserToGroup', addUserToGroup);

export default router;