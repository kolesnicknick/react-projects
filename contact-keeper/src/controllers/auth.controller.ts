import {Request, Response} from "express";
import * as HttpStatus from "http-status-codes";
import * as bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';
import {validationResult} from "express-validator";
import User from "../models/User";
import * as config from "../config/default.json";

export const me = async (_: Request, res: Response) => {
    try {
        console.log(_.user);
        const user = await User.findById(_.user).select('-password');
        res.json(user);
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Server error');
    }
};

export const login = async (_: Request, res: Response) => {
    const errors = validationResult(_);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json(errors)
    }

    const {email, password} = _.body;

    try {
        let user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({msg: 'Invalid Credentials'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({msg: 'Invalid Credentials'});
        }

        const payload = {
            id: user.id
        };

        await jwt.sign(payload, config.secret, {
            expiresIn: 36000
        }, (err, token) => {
            res.json({token});
        });
    } catch (e) {
        console.log(e);
        res.status(500).send('Server error occured');
    }
};
