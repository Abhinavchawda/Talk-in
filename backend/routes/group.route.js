import { Router } from "express";
import { createGroup, getGroups } from "../controller/group.controller.js";
import { secureRoute } from "../middlewares/secureRoute.js";

const router = Router();

router.post("/create", secureRoute, createGroup);
router.get("/:id", secureRoute, getGroups);

export default router;