import express from 'express';
import { groups } from '../controllers/index';
import isLoggedIn from '../helpers/isLoggedIn';

const router = express.Router();

router.post('/', isLoggedIn, groups.newGroup);
export default router;
