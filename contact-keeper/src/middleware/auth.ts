import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import * as config from '../config/default.json';


export function auth(req: Request, res: Response, next: NextFunction) {
  //Get Token from header
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.secret);
    console.log(decoded);
    req.user = decoded.id;
    next();
  }
  catch (e) {
    console.log(e);
    res.status(401).json({ msg: 'token is not valid' });
  }
}
