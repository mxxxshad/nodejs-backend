import express from 'express';
import {config} from "dotenv";
import {connectDB , disconnectDB} from "./config/db.js"
//Import Routes

import movieRoutes from "./routes/movieRoutes.js";

const app = express ()

// API Routes
app.use("/movies" , movieRoutes);

app.get("/hello" ,(req,res)=>{
    res.json({message: "Hello World"});
});

const PORT = 5001;
 app.listen(PORT ,() =>{
    console.log(`server running on ${PORT}`)
});

