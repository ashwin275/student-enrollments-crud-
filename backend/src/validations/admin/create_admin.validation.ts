import { body } from "express-validator";

export const create_admin_validation = () => {
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
      
    body("password")
      .exists().withMessage("Password is required")
      .isLength({ min: 4 }).withMessage("Password should be at least 4 characters long")
      .matches(/[a-zA-Z]/).withMessage("Password should include at least one letter")
      .matches(/[0-9]/).withMessage("Password should include at least one number")
  ];
}
