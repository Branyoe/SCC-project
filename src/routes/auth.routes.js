import {Router} from 'express';
const router = Router();

import * as authCtrl from '../controller/auth.controller'
import {verifySignup} from '../middlewares/index';

router.post('/signup', [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted], authCtrl.signUp);
router.post('/signin', authCtrl.signIn);

export default router;