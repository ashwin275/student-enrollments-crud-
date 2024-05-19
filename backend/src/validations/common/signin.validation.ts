import { body } from "express-validator";

export const signin_validation = () => {
  return [
   
    body("email")
      .exists().withMessage("Email is required")
      .isEmail().withMessage("Enter a valid email"),
      

    body("password")
      .exists().withMessage("Password is required")
      .isLength({ min: 4 }).withMessage("Password should be at least 4 characters long")
      .matches(/[a-zA-Z]/).withMessage("Password should include at least one letter")
      .matches(/[0-9]/).withMessage("Password should include at least one number")
  ];
}
