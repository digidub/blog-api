import { Router } from 'express';
import { get } from '../controllers/commentController';
const router = Router({ mergeParams: true });

router.get('/', get);

export default router;
