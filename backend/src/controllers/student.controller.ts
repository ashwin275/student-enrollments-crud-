import { Request, Response } from "express";
import { s_all_students, s_create_student, s_delete_student, s_search_students, s_update_user } from "../services/student.service";
import { validationResult } from "express-validator";


import { sendInvalidDataResponse } from "../utils/response.utils";


export const students = async (req: Request, res: Response) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return sendInvalidDataResponse(res,errors)
    }

    const result = await s_all_students(req,res)
    return result
}


export const create_student = async (req:Request,res:Response)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()){
       return sendInvalidDataResponse(res,errors)
    }else{
        
            const result =  await s_create_student(req,res);
            return result
       
    }
}

export const search_students = async(req:Request,res:Response) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
       return sendInvalidDataResponse(res,errors)
    }
    
    const result = await s_search_students(req,res)
    return result
}

export const delete_student = async(req:Request,res:Response) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return sendInvalidDataResponse(res,errors)
    }
    const result = await s_delete_student(req,res)
    return result
}

export const update_student = async (req: Request, res: Response) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return sendInvalidDataResponse(res,errors)
    }
    const result = await s_update_user(req,res);
    return result

    // if (result.status === 200) {
    //     return res.status(200).json(result.data);
    // } else {
    //     return res.status(result.status).json({ message: result.message });
    // }
};