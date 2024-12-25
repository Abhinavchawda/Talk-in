import { Router } from "express";
import { createGroup } from "../controller/group.controller.js";
import { secureRoute } from "../middlewares/secureRoute.js";

const router = Router();

router.post("/create", secureRoute, createGroup);

export default router;