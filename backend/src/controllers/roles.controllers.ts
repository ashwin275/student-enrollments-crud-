import { Request, Response } from "express";
import { s_all_roles, s_create_roles } from "../services/roles.service";
import { validationResult } from "express-validator";
import { AuthenticatedRequest } from "../interface/authenticated.request";
import { isSuperAdmin } from "../utils/auth.utils";
import { sendForbiddenResponse, sendInvalidDataResponse } from "../utils/response.utils";

export const create_roles = async(req:AuthenticatedRequest,res:Response) =>{
    const errors = validationResult(req)
    if(!isSuperAdmin(req.user)){
        sendForbiddenResponse(res)
        return
     }
    if (!errors.isEmpty()){
        sendInvalidDataResponse(res,errors)
   
    }else{
       
        const result = await s_create_roles(req,res);
        return result
       
  
    }

}


export const roles = async (req:Request,res:Response) =>{
    const error = validationResult(req)
   
  
    
    if (!error.isEmpty()){
       sendInvalidDataResponse(res,error)
       return
    }else{
     
        const result = await s_all_roles(req,res);
        return result
       
    }
}