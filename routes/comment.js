import { Router } from 'express';
import { get, post } from '../controllers/commentController';
const router = Router({ mergeParams: true });

router.get('/', get);
router.post('/', post);

export default router;
