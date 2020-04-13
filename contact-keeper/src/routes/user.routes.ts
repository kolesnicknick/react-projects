import * as express from "express";
import * as userController from '../controllers/user.controller'
import {check} from "express-validator";

const router = express.Router();


router.post("/", [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password should be valid').isLength({min: 6, max: 100}),
], userController.register);


export default router;