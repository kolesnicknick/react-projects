import * as express from "express";
import * as authController from '../controllers/auth.controller'
import {auth} from '../middleware/auth'
import {check} from "express-validator";

const router = express.Router();

//@route    POST api/users/login
//@desc     Register a user
//@access   Public
router.post("/login", [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
], authController.login);

//@route    GET api/users/me
//@desc     Register a user
//@access   Private
router.get("/me", auth, authController.me);

export default router;