import express from "express"
import { create_student, delete_student, search_students, students, update_student } from "../controllers/student.controller"
import { create_student_validation, student_id_validation } from "../validations/students/create_studetn.validation"

export const students_route = express.Router()

students_route.get("/", student_id_validation(), students)
students_route.post("/create",create_student_validation(), create_student)
students_route.get("/search",search_students)
students_route.delete("/delete/:student_id",student_id_validation(),delete_student)
students_route.put("/update/:student_id",student_id_validation(),update_student)