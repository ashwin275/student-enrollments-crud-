import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../interface/authenticated.request';
import { config } from "dotenv";
import { resolve } from "path";


config({ path: resolve(__dirname, "../../.env") });


const JWT_SECRET = process.env.JWT_SECRET as string;


export const jwtAuthMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
  
    if (!authHeader) {
        return res.status(401).json({ error: true, message: 'Authorization header is missing' });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: true, message: 'Token is missing' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
        
        if (err) {
            return res.status(403).json({ error: true, message: 'Invalid token' });
        }

        
        req.user = decoded;

        next();
    });
};
