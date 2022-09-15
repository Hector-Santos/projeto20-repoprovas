
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { findById } from "../repositories/usersRepository";



export async function verifyToken(req:Request, res:Response, next:NextFunction) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    
    if (!token) throw {type: 'unauthorized', message: 'no token was provided'}

    const SECRET: string = process.env.TOKEN_SECRET_KEY ?? '';

    try {
      const {userId} = jwt.verify(token,SECRET) as {userId:number};
      const user = await findById(userId);
      res.locals.user = user;
      next();
    } catch {
      throw {type: 'unauthorized', message: 'the provided token is not valid'};
    }

    next();
  }

