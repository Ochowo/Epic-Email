import express from 'express';
import users from '../controllers/index';
import { validEmail, userExists, checkSignupInput } from '../helpers/index';

const router = express.Router();

router.post('/signup', checkSignupInput, validEmail, userExists, users.signup);


export default router;
