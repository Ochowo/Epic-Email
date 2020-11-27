import express from 'express';
import GroupMemberController from '../../controllers/groupMembersController';
import Authenticate from '../../middleware/auth/Authenticate';

const { verifyToken } = Authenticate;
const {
  createGroupMember, getAllGroupMembers, getAMember, deleteMember,
} = GroupMemberController;

const router = express.Router();

router.post('/groups/members/:groupId', verifyToken, createGroupMember);
router.get('/groups/members/:groupId', verifyToken, getAllGroupMembers);
router.get('/groups/members/:groupId/:userId', verifyToken, getAMember);
router.delete('/groups/members/:groupId/:userId', verifyToken, deleteMember);
export default router;
