import express from "express";
import { sendMessage, getMessage } from "../controller/message.controller.js";
import { secureRoute } from "../middlewares/secureRoute.js";

const router = express.Router();

router.post("/send/:id", secureRoute, sendMessage);
router.get("/get/:id", secureRoute, getMessage);

export default router;