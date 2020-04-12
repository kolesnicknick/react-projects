import { Request, Response } from "express";
import * as HttpStatus from "http-status-codes";

export const me = (_: Request, res: Response) => {
    res.json({
        user: "Niko",
    });
};

export const login = (_: Request, res: Response) => {
    res.json({
        token: "Bearer 123213241231412231",
    });
};