import express from 'express';
import { messages } from '../controllers/index';
import { isLoggedIn, checkMsgInput } from '../helpers/index';

const router = express.Router();

router.post('/messages', isLoggedIn, checkMsgInput, messages.newMessage);
router.get('/messages', isLoggedIn, messages.getAllMessages);

export default router;
