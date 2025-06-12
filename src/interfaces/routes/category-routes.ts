import { Router } from "express";
import { CategoryController } from "../controllers/category-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();
const categoryController = new CategoryController();

router.post("/save", authMiddleware, categoryController.save);
router.post("/update", authMiddleware, categoryController.update);
router.post("/find-one", authMiddleware, categoryController.findOne);
router.post("/find-all", authMiddleware, categoryController.findAll);

export default router;
