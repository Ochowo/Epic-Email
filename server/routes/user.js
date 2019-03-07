import express from 'express';
import { users } from '../controllers/index';
import {
  validEmail, userExists, checksignupInput, checkSigninInput,
} from '../helpers/index';

const router = express.Router();

router.post('/signup', checksignupInput, validEmail, userExists, users.signup);
router.post('/login', checkSigninInput, validEmail, users.signin);


export default router;
