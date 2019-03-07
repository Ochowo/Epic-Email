import express from 'express';
import { messages } from '../controllers/index';
import {
  isLoggedIn, checkMsgInput, wrongtoken,
} from '../helpers/index';

const router = express.Router();

router.post('/messages', isLoggedIn, wrongtoken, checkMsgInput, messages.newMessage);
router.get('/messages', isLoggedIn, wrongtoken, messages.getAllMessages);
router.get('/messages/unread', isLoggedIn, wrongtoken, messages.getUnread);
router.get('/messages/sent', isLoggedIn, wrongtoken, messages.getSent);
router.get('/messages/:id', isLoggedIn, wrongtoken, messages.getSpecificEmail);
router.delete('/messages/:id', isLoggedIn, wrongtoken, messages.deleteEmail);
export default router;
