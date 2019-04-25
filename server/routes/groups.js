import express from 'express';
import { groups } from '../controllers/index';
import { validEmail, isLoggedIn } from '../helpers';

const router = express.Router();

router.post('/', isLoggedIn, groups.newGroup);
router.get('/', isLoggedIn, groups.getGroups);
router.patch('/:id/name', isLoggedIn, groups.updateGroup);
router.delete('/:id', isLoggedIn, groups.deleteGroup);
router.post('/:id/users', isLoggedIn, validEmail, groups.createUser);
router.get('/:id/users', isLoggedIn, groups.getUsers);
router.delete('/:id/users/:userId', isLoggedIn, groups.deleteUser);
router.post('/:id/messages', isLoggedIn, groups.newMessage);
router.get('/:id/messages', isLoggedIn, groups.getMessage);

export default router;
