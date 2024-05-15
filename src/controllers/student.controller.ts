import { Request, Response } from "express";
import { s_all_students, s_create_student, s_delete_student, s_search_students, s_update_user } from "../services/student.service";
import { validationResult } from "express-validator";
import { student_id_validation } from "../validations/students/create_studetn.validation";


export const students = async (req: Request, res: Response) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.json({
            error: true,
            errors: errors.array(),
            message: "invalid data"
        })
    }

    const result = await s_all_students(req)
    res.status(200).json(result)
}


export const create_student = async (req:Request,res:Response)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()){
       res.json(
        {
            error:true,
            errors:errors.array(),
            "message":"invalid data"
        }
       )
    }else{
        try{
            const result =  await s_create_student(req);
            res.status(200).json(result)
        } catch (error){
            res.status(400).json({ error: true, message: 'Student not created' });
        }
    }
}

export const search_students = async(req:Request,res:Response) =>{
    
    const result = await s_search_students(req)
    res.status(200).json(result)
}

export const delete_student = async(req:Request,res:Response) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: true,
            errors: errors.array(),
            message: "invalid data"
        })
    }
    const result = await s_delete_student(req)
    res.status(200).json(result)
}

export const update_student = async (req: Request, res: Response) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: true,
            errors: errors.array(),
            message: "invalid data"
        })
    }
    const result = await s_update_user(req);

    if (result.status === 200) {
        return res.status(200).json(result.data);
    } else {
        return res.status(result.status).json({ message: result.message });
    }
};