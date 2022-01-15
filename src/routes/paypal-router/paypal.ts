import { Router } from 'express';
const router = Router();
import { getClientID } from '../../controllers/paypal/paypal.controller';
router.route('/')
    .get( getClientID );

export default router;