import express from 'express';
import { users } from '../controllers/index';
import { userExists, isLoggedIn } from '../helpers';

const router = express.Router();

router.post('/signup', userExists, users.signup);
router.post('/login', users.signin);
router.post('/contacts', isLoggedIn, users.contacts);

export default router;
