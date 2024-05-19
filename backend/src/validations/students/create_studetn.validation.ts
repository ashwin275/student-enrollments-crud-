import { check,body } from "express-validator"


export const create_student_validation=()=>{
 return [
   body("name")
   .exists().withMessage("Name is required")
   .isLength({ min: 5, max: 40 }).withMessage("Name should be between 5 to 40 characters"),
   
 body("email")
   .exists().withMessage("Email is required")
   .isEmail().withMessage("Enter a valid email"),
   
 body("role_id")
   .exists().withMessage("Role is required")
   .isUUID().withMessage("Role ID should be a valid UUID"),
   
 ];
}

export const student_id_validation=()=>{
   return[
      check("student_id").optional().isUUID().withMessage("student_id should be a valid UUID")

   ];
}