import express from "express"
import { students_route } from "./routes/students.routes";
import "./database/db"


const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/v1/student",students_route)

app.listen(3000,()=>{
    console.log(`app running on port 3000`)
})