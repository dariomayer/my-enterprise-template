import { Router } from 'express';
import { exportUserData, deleteUserData } from '../controllers/privacy.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

// Both GDPR endpoints require authentication — users can only export/delete their OWN data
router.post('/export', authMiddleware, exportUserData);
router.delete('/delete', authMiddleware, deleteUserData);

export default router;
