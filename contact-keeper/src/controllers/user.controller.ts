import { Request, Response } from "express";
import * as HttpStatus from "http-status-codes";


//@route    POST api/users/
//@desc     Register a user
//@access    Public
export const register = (_: Request, res: Response) => {
    res.json({
        msg: "User is registered",
    });
};