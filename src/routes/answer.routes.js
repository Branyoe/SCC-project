import { Router } from "express";
const router = Router();
import * as answerCtrl from '../controller/answer.controller';
import {authJwt} from '../middlewares/index';

//create a new answer
router.post('/',[authJwt.verifyToken, authJwt.isUser] ,answerCtrl.createAnswer);

//get all answers
router.get(
  '/',
  [authJwt.verifyToken, authJwt.isModerator],
  answerCtrl.getAnswers
)

//get answers by user id
router.get(
  '/:userId',
  [authJwt.verifyToken],
  answerCtrl.getAnswersByUserId
);

//update answer by id
router.put(
  '/:answerId',
  [authJwt.verifyToken, authJwt.isUser],
  answerCtrl.updateAnswerById
)

//delete answer by id
router.delete(
  '/:answerId',
  [authJwt.verifyToken],
  answerCtrl.deleteAnswerById
)



export default router;