import { Router } from 'express';
const router = Router();
import { login, register } from '../controllers/authController';
import { authLocal } from '../passport';

router.post('/register', register);

router.post('/login', authLocal, login);

export default router;
