import express from "express";
import {addToWatchlist} from "../controllers/watchlistController.js"
import { login, logout } from "../controllers/authController.js"; 
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);
 
router.post("/" , addToWatchlist);
router.post("/login" , login);
router.post("/logout" , logout);
    
export default router;