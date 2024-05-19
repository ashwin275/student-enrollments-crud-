import express from "express"
import { students_route } from "./routes/students.routes";
import "./database/db"
import { admin_route } from "./routes/admin.routes";
import { roles_route } from "./routes/roles.routes";


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/v1/student",students_route)
app.use("/api/v1/admin",admin_route)
app.use("/api/v1/roles",roles_route)

app.listen(3000,()=>{
    console.log(`app running on port 3000`)
})