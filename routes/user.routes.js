import { Router } from "express";
import * as UserController from "../controllers/user.controller.js";
import { verifyAdmin } from "../verifyToken.js";

const USER_ROUTER = Router();

USER_ROUTER.post('/register', UserController.registerUser);
USER_ROUTER.post('/login', UserController.loginUser);
USER_ROUTER.get('/protected', verifyAdmin, UserController.protectedRoute);
USER_ROUTER.post('/send-otp', UserController.sendOTP);
USER_ROUTER.put('/reset-password', UserController.resetPassword);

export default USER_ROUTER;