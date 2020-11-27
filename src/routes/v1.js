import express from 'express';
import usersRoute from './api/userRoute';
import groupRoute from './api/groupRoute';
import messageRoute from './api/messageRoute';
import groupMemberRoute from './api/groupMemberRoute';

const router = express.Router();
router.use('/v1', usersRoute);
router.use('/v1', messageRoute);
router.use('/v1', groupRoute);
router.use('/v1', groupMemberRoute);

export default router;
