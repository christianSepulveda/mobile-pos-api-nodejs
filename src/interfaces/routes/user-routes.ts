import { Router } from "express";
import { UserController } from "../controllers/user-controller";

const router = Router();
const userController = new UserController();

router.post("/login", userController.find);
router.post("/save", userController.save);
router.post("/update", userController.update);

export default router;
