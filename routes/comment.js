import { Router } from 'express';
import { get, post, remove } from '../controllers/commentController';
const router = Router({ mergeParams: true });
import { authJwt } from '../passport';

router.get('/', get);
router.post('/', post);
router.delete('/:commentID', authJwt, remove);

export default router;
