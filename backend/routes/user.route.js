import express from "express";
import { signup, login, logout, getAllUsersProfile, checkUserLoggedIn, getUserProfile, updateUserProfile } from "../controller/user.controller.js";
import { secureRoute } from "../middlewares/secureRoute.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getAllUsersProfile", secureRoute, getAllUsersProfile);
router.get("/checkUserLoggedIn", secureRoute, checkUserLoggedIn);
router.get("/profile/:_id", secureRoute, getUserProfile);
router.patch("/update-profile/:_id", secureRoute, updateUserProfile);

export default router;