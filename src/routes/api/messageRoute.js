import express from 'express';
import MessageController from '../../controllers/MessageController';
import Authenticate from '../../middleware/auth/Authenticate';

const { verifyToken } = Authenticate;
const {
  createMessage, sendDraft, getAMessage, getAllMessages,
  updateMessage, deleteMessage, getMessageByFolder,
} = MessageController;

const router = express.Router();

router.post('/messages', verifyToken, createMessage);
router.get('/messages/folder', verifyToken, getMessageByFolder);
router.get('/messages', verifyToken, getAllMessages);
router.get('/messages/:id', verifyToken, getAMessage);
router.put('/messages/:id', verifyToken, updateMessage);
router.put('/messages/draft/:id', verifyToken, sendDraft);
router.delete('/messages/:id', verifyToken, deleteMessage);
export default router;
