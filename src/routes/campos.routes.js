// const router = require('express').Router();
// const { createCampo } = require('../controller/data-user.controller')


// router.get('/', createCampo)

// module.exports = router;

import {Router} from 'express';
const router = Router();
import * as dataUserCtrl from '../controller/campos.controller'
import {authJwt} from '../middlewares/index';
//get all campos
router.get('/',[authJwt.verifyToken] ,dataUserCtrl.getCampos);

//get a campo by Id
router.get('/:campoId',[authJwt.verifyToken] ,dataUserCtrl.getCampoById);

//create a new campo
router.post('/', [authJwt.verifyToken, authJwt.isModerator ],dataUserCtrl.createCampo);

//update a campo by Id
router.put('/:campoId', [authJwt.verifyToken, authJwt.isModerator ], dataUserCtrl.updateCampoById);

//delete a campo by Id
router.delete('/:campoId', [authJwt.verifyToken, authJwt.isModerator ], dataUserCtrl.deleteCampoById);

export default router;