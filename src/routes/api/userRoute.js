import { Router } from 'express';
import UserController from '../../controllers/UserController';
import signUpValidation from '../../middleware/validations/signupvalidator';
import signInValidation from '../../middleware/validations/signinValidator';
import Authenticate from '../../middleware/auth/Authenticate';

const { verifyToken } = Authenticate;

const router = Router();

router.post('/auth/signup', signUpValidation, UserController.registerUser);
router.post('/auth/signin', signInValidation, UserController.login);
router.get('/users', verifyToken, UserController.getAllUsers);
router.get('/user', verifyToken, UserController.getAUser);
export default router;
