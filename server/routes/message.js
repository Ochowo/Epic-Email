import express from 'express';
import { message } from '../controllers/index';
import { isLoggedIn } from '../helpers';

const router = express.Router();

router.post('/messages', isLoggedIn, message.newMessage);
router.get('/messages', isLoggedIn, message.getAllMessages);
router.get('/messages/unread', isLoggedIn, message.getUnread);
router.get('/messages/sent', isLoggedIn, message.getSent);
router.get('/messages/:id', isLoggedIn, message.getSpecificMessage);
router.get('/messages/sent/:id', isLoggedIn, message.getSpecificSent);
router.get('/messages/unread/:id', isLoggedIn, message.getSpecificUnread);
router.delete('/messages/:id', isLoggedIn, message.deleteSpecificMessage);
router.delete('/messages/sent/:id', isLoggedIn, message.deleteSpecificSent);

export default router;
