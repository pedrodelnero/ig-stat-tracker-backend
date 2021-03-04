import express from 'express';

import { getIgStats } from '../controllers/getIgStats.js';
import { createUser, loginUser, logOut } from '../controllers/Users.js';
import {
  createHandle,
  getHandles,
  deleteHandle,
  updateHandle,
} from '../controllers/IgHandles.js';
import auth from '../middleware/auth.js';

const router = new express.Router();

router.post('/ig-proposal', getIgStats);

router.post('/sign-up', createUser);
router.post('/login', loginUser);
router.post('/logout', auth, logOut);

router.post('/handle', auth, createHandle);
router.get('/handles', auth, getHandles);
router.delete('/handle/:handleId', auth, deleteHandle);
router.patch('/handle/:handleId', auth, updateHandle);

export default router;
