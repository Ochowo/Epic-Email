import express from 'express';
import { users } from '../controllers/index';

const router = express.Router();

router.post('/signup', users.signup);
router.post('/login', users.signin);
router.post('/reset', users.reset);
router.post('/:x-access-token/reset-password', users.resetPassword);

export default router;
