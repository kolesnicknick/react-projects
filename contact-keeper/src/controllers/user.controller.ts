import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as bcrypt from 'bcrypt';
import * as config from '../config/default.json';
import * as jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User'

import { validationResult } from 'express-validator';


//@route    POST api/users/
//@desc     Register a user
//@access    Public
export const register = async (_: Request, res: Response) => {

    const errors = validationResult(_);
    if (!errors.isEmpty()) {
        res.status(HttpStatus.BAD_REQUEST).json(errors)
    }

    const {name, email, password} = _.body;

    try {
        let user = await User.findOne({email});

        if (user) {
            return res.status(400).json({msg: 'User already exists'});
        }

        user = new User({
            name,
            email,
            password
        });

        console.log('User created');

        user.password = await bcrypt.hash(password, 10);

        const savedUser: IUser = await user.save();

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
