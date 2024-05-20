import { Request, Response } from "express";

import { isDuplicateKeyError } from "../utils/error.utils";
import * as bcrypt from 'bcrypt';
import { generatetoken } from "../utils/jwt.utils";
import { AdminRepository } from "../repositories";
export const s_create_admin = async(req:Request,res:Response)=>{
    try{
        const {role_id,name,email,password} = req.body;
        

        const admin = AdminRepository.create({
            role: role_id,
            name: name,
            email:email,
            password:password
        });

        const savedadmin = await AdminRepository.save(admin)
        const { password: _, ...response } = savedadmin;
        return res.status(201).json(response)
    }catch (error){
        if (isDuplicateKeyError(error)) {

            return res.status(400).json({ error: true, message: "Admin with this email already exists" });
        } else if (error instanceof Error) {
            console.log(error)
            return res.status(400).json({ error: true, message: error.message || "Admin not created" });
        }else{
            res.status(500).json({error:true,message:"Internal Server Error" })
        }

    }
}

export const s_admin_signin = async(req:Request,res:Response) =>{
    try{
        console.log("inside admin")
        const {email,password} = req.body

       

        const admin = await AdminRepository
            .createQueryBuilder("admin")
            .where("admin.email = :email", { email })
            .leftJoinAndSelect("admin.role", "role")
            .getOne();

        if(!admin){
            return res.status(400).json({error:true,message:"User Not Found"})
        }

        const ispasswordvalid = await bcrypt.compare(password, admin.password);

        if (!ispasswordvalid) {
            return res.status(400).json({ error: true, message: 'Invalid password' });
          }

        
      

        const token = generatetoken(admin.admin_id,admin.email,admin.role.role_name)

        return res.status(200).json({
            message:'Login Successful',
            token,
            user:{
                admin_id:admin.admin_id,
                name:admin.name,
                email:admin.email,
                role :admin.role.role_name
                
            }
        });



    }catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: 'Internal Server Error' });
      }
}