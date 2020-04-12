import { Request, Response } from "express";
import * as HttpStatus from "http-status-codes";


export const getContacts = (_: Request, res: Response) => {
    res.json({
        items: [],
    });
};

export const createContact = (_: Request, res: Response) => {
    res.json({
        msg: "Contact with name ${res.name} is created",
    });
};

export const updateContact = (_: Request, res: Response) => {
    res.json({
        msg: `Contact with name ${_.params.id} is updated`,
    });
};

export const deleteContact = (_: Request, res: Response) => {
    res.json({
        msg: `Contact with name ${_.params.id} is deleted`,
    });
};