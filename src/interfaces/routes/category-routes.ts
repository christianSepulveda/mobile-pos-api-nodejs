import { Router } from "express";
import { CategoryController } from "../controllers/category-controller";

const router = Router();
const categoryController = new CategoryController();

router.post("/save", categoryController.save);
router.post("/update", categoryController.update);
router.post("/find-one", categoryController.findOne);
router.post("/find-all", categoryController.findAll);

export default router;
