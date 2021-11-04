import { Router } from 'express';
import {
  get,
  getID,
  post,
  remove,
  update,
} from '../controllers/postController';
import { authJwt } from '../passport';
const router = Router();

router.get('/', get);
router.get('/:postID', getID);
router.post('/', authJwt, post);
router.put('/:postID', authJwt, update);
router.put('/', authJwt, update);
router.delete('/:postID', authJwt, remove);

export default router;
