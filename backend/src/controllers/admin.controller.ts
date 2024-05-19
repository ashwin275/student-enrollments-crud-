
import { Request,Response } from "express"
import { validationResult } from "express-validator"
import { s_admin_signin, s_create_admin } from "../services/admin.service"
import { sendInvalidDataResponse } from "../utils/response.utils"

export const create_admin = async(req:Request,res:Response) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()){
       return sendInvalidDataResponse(res,errors)
     
    }else{
       
        const result = await s_create_admin(req,res);
        return result
       
  
    }
}

export const admin_signin = async(req:Request,res:Response) =>{

    const errors = validationResult(req)
    if (!errors.isEmpty()){
       return sendInvalidDataResponse(res,errors)
    }else{
       
        const result = await s_admin_signin (req,res);
        return result
       
  
    }

}