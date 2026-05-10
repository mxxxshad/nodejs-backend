import express from 'express';
import {config} from "dotenv";
// import cors from 'cors';

//Import Routes

import movieRoutes from "./routes/movieRoutes.js";
import authRoutes from "./routes/authRoutes.js";



config();



const app = express();
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// API Routes

app.use("/auth" , authRoutes);

app.get("/hello" ,(req,res)=>{
    res.json({message: "Hello World"});
});

app.get("/" ,(req,res)=>{
    res.json({message: "Server is running successfully!"});
});

const server = app.listen(process.env.PORT || 5001, "0.0.0.0", () => {
  console.log(`Server running on PORT ${process.env.PORT}`);
});

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});