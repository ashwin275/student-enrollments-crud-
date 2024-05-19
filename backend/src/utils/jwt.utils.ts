import * as jwt from 'jsonwebtoken';
import { config } from "dotenv";
import { resolve } from "path";


config({ path: resolve(__dirname, "../../.env") });


const JWT_SECRET = process.env.JWT_SECRET as string;

if (!JWT_SECRET){
    throw new Error("JWT_SECRET is not defined in environment variables");
}


export const generatetoken = (id:string,email:string,role:string):string => {
    return jwt.sign({id,email,role},JWT_SECRET,{
        expiresIn:'1h'
    });
}