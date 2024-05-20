import express from "express"
import { create_roles, roles } from "../controllers/roles.controllers"
import { create_role_validation, role_id_validation } from "../validations/roles/create_roles.validation"
import { jwtAuthMiddleware } from "../middleware/jwtauthmiddleware"

export const roles_route = express.Router()


roles_route.post("/create",jwtAuthMiddleware, create_role_validation(), create_roles)
roles_route.get("/", role_id_validation(),roles)