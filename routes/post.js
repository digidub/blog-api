import { Router } from 'express';
import { get, getID, post } from '../controllers/postController';
const router = Router();

router.get('/', get);
router.get('/:postID', getID);
router.post('/', post);
export default router;
