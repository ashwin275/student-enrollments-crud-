import express from "express"
import { create_admin_validation } from "../validations/admin/create_admin.validation"
import { admin_signin, create_admin } from "../controllers/admin.controller"
import { signin_validation } from "../validations/common/signin.validation"

export const admin_route = express.Router()

admin_route.post("/create",create_admin_validation(),create_admin)
admin_route.post("/signin",signin_validation(),admin_signin)

