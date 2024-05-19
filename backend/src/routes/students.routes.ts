import express from "express"
import { create_student, delete_student, search_students, students, update_student } from "../controllers/student.controller"
import { create_student_validation, student_id_validation ,student_update_validation} from "../validations/students/create_studetn.validation"
import { search_student_validation } from "../validations/students/search_student.validation"
import { jwtAuthMiddleware } from "../middleware/jwtauthmiddleware"
export const students_route = express.Router()

students_route.get("/",jwtAuthMiddleware, student_id_validation(), students)
students_route.post("/create",jwtAuthMiddleware,create_student_validation(), create_student)
students_route.get("/search",jwtAuthMiddleware,search_student_validation(), search_students)
students_route.delete("/delete",jwtAuthMiddleware,student_id_validation(),delete_student)
students_route.put("/update",jwtAuthMiddleware,student_update_validation(),update_student)