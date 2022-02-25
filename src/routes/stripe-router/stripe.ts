import { Router } from 'express';
import { getStripeClientID } from '../../controllers/stripe/stripe.controller';
const router: Router = Router();

router.route('/')
    .get( getStripeClientID);

export default router;