import { Request, Response } from "express";
import * as HttpStatus from "http-status-codes";
export const getHome = (_: Request, res: Response) => {
    res.json({
        msg: "Your micro service name",
        version: process.env.npm_package_version
    });
};

export const getHealth = (_: Request, res: Response) => {
    // Put logic to check DB connection, cache Connection and Etc here
    // If something wrong on that give status NOT OK
    // If status NOT OK set status code as HttpStatus.SERVICE_UNAVAILABLE
    const somethingWrong = false;

    if (somethingWrong) {
        res.status(HttpStatus.SERVICE_UNAVAILABLE);
        return res.json({
            status: "UNAVAILABLE"
        });
    }

    res.status(HttpStatus.OK);
    res.json({
        status: "OK"
    });
};

export const getPing = (_: Request, res: Response) => {
    res.status(HttpStatus.OK).send("PONG");
};