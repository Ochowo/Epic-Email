import express from 'express';
import api from './v1';

const router = express.Router();

router.use('/api', api);

export default router;
