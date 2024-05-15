import { check } from "express-validator"


export const create_student_validation=()=>{
 return [
    check("name").exists().withMessage("name is required").isLength({min:5,max:40}).withMessage("name should be between 5 to 40 charecter"),
    check("email").isEmail().withMessage("enter a valid email"),
    check("age").isNumeric().withMessage("age should be a number")
 ];
}

export const get_student_validation=()=>{
   return[
      check("student_id").optional().isUUID().withMessage("student_id should be a valid UUID")

   ]
}