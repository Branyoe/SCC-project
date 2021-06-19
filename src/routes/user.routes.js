import {Router} from 'express';
const router = Router();
import * as userCtrl from '../controller/users.controller';
import {authJwt, verifySignup} from '../middlewares/index';

//create a new user
router.post('/', [
  authJwt.verifyToken,
  authJwt.isAdmin,
  verifySignup.checkDuplicateUsernameOrEmail,
  verifySignup.checkRolesExisted
], userCtrl.createUser);

//get all Users
router.get('/', [
  authJwt.verifyToken,
  authJwt.isModerator
], userCtrl.getUsers);

//get a user by id
router.get('/:userId', [
  authJwt.verifyToken,
  authJwt.isModerator
], userCtrl.getUserById);

//update a user by id
router.put('/:userId', [
  authJwt.verifyToken,
  authJwt.isAdmin,
  verifySignup.checkDuplicateUsernameOrEmail,
  verifySignup.checkRolesExisted
], userCtrl.updateUserById);

//delete a user by id
router.delete('/:userId', [
  authJwt.verifyToken,
  authJwt.isAdmin,
], userCtrl.deleteUserById);
 
export default router;