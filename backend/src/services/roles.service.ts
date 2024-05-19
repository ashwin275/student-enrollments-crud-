import { Request ,Response} from "express";

import { isDuplicateKeyError } from "../utils/error.utils";
import { RoleRepository } from "../repositories";
export const s_create_roles = async (req: Request, res: Response) => {
    try {
        const { role_name, description } = req.body;
       
        
        const newRole = RoleRepository.create({
            role_name: role_name,
            description: description
        });

        const savedRole = await RoleRepository.save(newRole);

        return res.status(201).json(savedRole);
    } catch (error) {
        if (isDuplicateKeyError(error)) {

            return res.status(400).json({ error: true, message: "Role already exists" });
        } 
        
        else if (error instanceof Error) {
            res.status(400).json({ error: true, message: error.message || "Role not created" });
        } else {
            res.status(500).json({ error: true, message: "Internal Server Error" });
        }
    }
};


export const s_all_roles = async (req: Request, res: Response) => {
    try {
        const role_id: any = req.query.role_id;
        

        
        if (role_id) {
            const role = await RoleRepository.findOne({ where: { role_id: role_id } });
            if (!role) {
                return res.status(404).json({ error: "Role Not Found" });
            }
            return res.json([role]);
        } else {
            const roles = await RoleRepository.find();
            return res.json(roles);
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}