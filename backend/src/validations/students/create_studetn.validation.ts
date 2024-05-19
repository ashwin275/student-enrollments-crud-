import { check,body ,query} from "express-validator"


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
   

 body("admin_id")
   .exists().withMessage("Admin is required")
   .isUUID().withMessage("Admin ID should be a valid UUID"),
   
  ];
}

export const student_id_validation=()=>{
   return[
      query("student_id").optional().isUUID().withMessage("student_id should be a valid UUID")

   ];
}


export const student_update_validation =()=>{
  return[

    query("student_id").exists().isUUID().withMessage("student_id should be a valid UUID")
     
    ,body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .withMessage("Provide name"),

    body("email")
    .optional()
    .isEmail()
    .withMessage("Enter a valid email"),

    body("age")
    .optional()
    .isNumeric()
    .withMessage("enter a valid no"),

    body("dob")
    .optional()
    .isISO8601()
    .withMessage("Enter a valid date of birth (YYYY-MM-DD)")
];



}