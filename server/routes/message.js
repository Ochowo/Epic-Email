import express from 'express';
import { messages } from '../controllers/index';
import {
  isLoggedIn, checkMsgInput,
} from '../helpers/index';

const router = express.Router();

router.post('/messages', isLoggedIn, checkMsgInput, messages.newMessage);
router.get('/messages', isLoggedIn, messages.getAllMessages);
router.get('/messages/unread', isLoggedIn, messages.getUnread);
router.get('/messages/sent', isLoggedIn, messages.getSent);
router.get('/messages/:id', isLoggedIn, messages.getSpecificEmail);
export default router;
