import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();
const userController = new UserController();

router.post("/login", userController.find);
router.post("/save", userController.save);
router.post("/update", authMiddleware, userController.update);
router.post("/refresh", userController.refreshToken);

export default router;
