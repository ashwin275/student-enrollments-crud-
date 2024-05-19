import { Response } from "express";
import { validationResult,Result,ValidationError } from 'express-validator';

export const sendForbiddenResponse = (res:Response) => {
    return res.status(403).json({
        error: true,
        message: "User is not authorized to access this resource"
    });
};



export const sendInvalidDataResponse = (res: Response, error: Result<ValidationError>) => {
    const errors = error.array(); 
    return res.status(400).json({
        error: true,
        errors: errors,
        message: "Invalid data"
    });
};