import { Router } from 'express';
import healthRoutes from './health.routes';
import privacyRoutes from './privacy.routes';

const router = Router();

router.use('/', healthRoutes);
router.use('/api/v1/privacy', privacyRoutes);

export default router;
