import { createConnection } from "typeorm";
import { config } from "dotenv";
import { resolve } from "path";
import { Student } from "../entities/student.entities";
import { Admin } from "../entities/admin.entities";
import { Role } from "../entities/role.entities";
import { Instructor } from "../entities/instructors.entities";
import { Enrollment } from "../entities/enrollments.entities";
import { Course } from "../entities/courses.entites";
import { Major } from "../entities/major.entity";
import { Grade } from "../entities/grades.entities";


config({ path: resolve(__dirname, "../../.env") });


createConnection({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "university",
  
    "entities": [Student, Admin, Role, Instructor, Enrollment, Course, Major, Grade],
    "synchronize": true, 
})
.then(connection => {
    console.log("Database connection established successfully");
})
.catch(error => {
    console.error("Error connecting to database:", error);
});
