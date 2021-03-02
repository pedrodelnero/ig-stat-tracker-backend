import express from 'express';

import { getIgStats } from '../controllers/getIgStats.js';
import { createUser, loginUser } from '../controllers/Users.js';

const router = new express.Router();

router.post('/ig-proposal', getIgStats);

router.post('/sign-up', createUser);
router.post('/login', loginUser);

export default router;
