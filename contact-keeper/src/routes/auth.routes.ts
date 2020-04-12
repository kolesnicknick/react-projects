import * as express from "express";
import * as authController from '../controllers/auth.controller'
import * as publicController from "../controllers/auth.controller";
const router = express.Router();

//@route    POST api/users/login
//@desc     Register a user
//@access   Public
router.post("/login", authController.login);

//@route    GET api/users/me
//@desc     Register a user
//@access   Public
router.get("/me", authController.me);

export default router;