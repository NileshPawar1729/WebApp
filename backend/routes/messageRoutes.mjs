import express from 'express'
import protectRoute from '../middlewares/protectRoute.mjs';
import { getConversations, getMessages, sendMessage } from '../controllers/messageController.mjs';

const router = express.Router();

router.get('/conversation', protectRoute ,getConversations);
router.get('/:otherUserId', protectRoute ,getMessages);
router.post('/', protectRoute ,sendMessage);

export default router;