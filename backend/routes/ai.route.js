import { Router } from "express";
import { secureRoute } from "../middlewares/secureRoute.js";
import { getAnswer } from "../services/ai.service.js";

const router = Router();

router.get('/get-answer/:prompt', secureRoute, getAnswer);

export default router;