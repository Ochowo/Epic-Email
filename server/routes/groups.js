import express from 'express';
import { groups } from '../controllers/index';
import isLoggedIn from '../helpers/isLoggedIn';

const router = express.Router();

router.post('/', isLoggedIn, groups.newGroup);
router.get('/', isLoggedIn, groups.getGroups);
router.patch('/:id/name', isLoggedIn, groups.updateGroup);
export default router;
