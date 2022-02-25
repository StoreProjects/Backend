import { Router } from 'express';
import { signup, signin, getUser } from '../../controllers/user/user.controller';
import { TokenValidation } from '../../libs/verifyToken';

const router: Router = Router();

router.route('/signup')
    .post(signup);

router.route('/signin')
    .post(signin);

router.route('/user')
    .get( TokenValidation, getUser )

export default router;