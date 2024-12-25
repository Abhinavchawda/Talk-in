import express from "express";
import { sendMessage, getMessage, getLabelledMessages, updateLabel } from "../controller/message.controller.js";
import { secureRoute } from "../middlewares/secureRoute.js";

const router = express.Router();

router.post("/send/:id", secureRoute, sendMessage);
router.get("/get/:id", secureRoute, getMessage);
router.get("/label/:id", secureRoute, getLabelledMessages);
router.patch("/update-label/:id", secureRoute, updateLabel);

export default router;