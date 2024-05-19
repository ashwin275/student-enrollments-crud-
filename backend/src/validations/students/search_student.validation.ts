import { check, query } from "express-validator";

export const search_student_validation = () => {
    return [
       
        query().custom(query => {
            if (!query.name && !query.email) {
                return false
            }
            return true;
        }),

       
        check("name")
        .optional()
        .isString()
        .withMessage("Name must be a string")
        .withMessage("Provide name"),
        
      
        check("email")
            .optional()
            .isEmail()
            .withMessage("Enter a valid email")
    ];
};
