import * as express from "express";
import * as userController from '../controllers/user.controller'
const router = express.Router();


router.post("/", userController.register);


export default router;