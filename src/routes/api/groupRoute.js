import express from 'express';
import GroupController from '../../controllers/GroupController';
import groupValidation from '../../middleware/validations/groupValidator';
import Authenticate from '../../middleware/auth/Authenticate';

const { verifyToken } = Authenticate;
const {
  createGroup, getAGroup, getAllGroups, updateGroup, deleteGroup,
} = GroupController;

const router = express.Router();

router.post('/groups', groupValidation, verifyToken, createGroup);
router.get('/groups', verifyToken, getAllGroups);
router.get('/groups/:id', verifyToken, getAGroup);
router.put('/groups/:id', verifyToken, updateGroup);
router.delete('/groups/:id', verifyToken, deleteGroup);
export default router;
