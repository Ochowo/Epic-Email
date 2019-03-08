import express from 'express';
import { messages } from '../controllers/index';
import {
  isLoggedIn, wrongToken, checkMsgInput,
} from '../helpers/index';

const router = express.Router();

router.post('/messages', isLoggedIn, wrongToken, checkMsgInput, messages.newMessage);
router.get('/messages', isLoggedIn, wrongToken, messages.getAllMessages);
router.get('/messages/unread', isLoggedIn, wrongToken, messages.getUnread);
router.get('/messages/sent', isLoggedIn, wrongToken, messages.getSent);
router.get('/messages/:id', isLoggedIn, wrongToken, messages.getSpecificEmail);
router.delete('/messages/:id', isLoggedIn, wrongToken, messages.deleteEmail);
export default router;
