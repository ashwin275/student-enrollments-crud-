import { createConnection } from "typeorm";
import { config } from "dotenv";
import { resolve } from "path";


import path from 'path';
config({ path: resolve(__dirname, "../../.env") });


createConnection({
    "type": "postgres",
    "host": "localhost",
    "port": 5432,
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "university",
  
    entities: [path.join(__dirname, '..', 'entities', '*.ts')],
    "synchronize": true, 
})
.then(connection => {
    console.log("Database connection established successfully");
})
.catch(error => {
    console.error("Error connecting to database:", error);
});
