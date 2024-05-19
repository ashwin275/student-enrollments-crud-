import {check, body } from "express-validator";

export const create_role_validation = () => {
    return [
        body("role_name")
            .exists()
            .isLength({ min: 5, max: 40 })
            .withMessage("Role name should be between 5 to 40 characters"),
        body("description")
            .exists()
            .withMessage("Description is required")
            .bail() 
            .custom(value => {
                if (typeof value !== 'string' || value.trim().length === 0) {
                    throw new Error("Description should not be empty or just whitespace");
                }
                return true;
            })
    ];
};

export const role_id_validation=()=>{
    return[
       check("role_id").optional().isUUID().withMessage("student_id should be a valid UUID")
 
    ];
 }