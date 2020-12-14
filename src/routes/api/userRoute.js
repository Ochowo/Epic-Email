import { Router } from 'express';
import UserController from '../../controllers/UserController';
import signUpValidation from '../../middleware/validations/signupvalidator';
import signInValidation from '../../middleware/validations/signinValidator';

const router = Router();

router.post('/auth/signup', signUpValidation, UserController.registerUser);
router.post('/auth/signin', signInValidation, UserController.login);
router.get('/users', UserController.getAllUsers);
router.get('/user', UserController.getAUser);
export default router;
