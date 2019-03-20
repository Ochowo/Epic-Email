import express from 'express';
import { users } from '../controllers/index';
import { userExists } from '../helpers';

const router = express.Router();

router.post('/signup', userExists, users.signup);
router.post('/login', users.signin);

export default router;
