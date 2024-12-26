import { Router } from "express";
import { secureRoute } from "../middlewares/secureRoute.js";
import { getAllChats } from "../controller/chat.controller.js";

const router = Router();

router.get("/getAllChats", secureRoute, getAllChats);

export default router;