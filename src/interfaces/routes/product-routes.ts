import { Router } from "express";
import { ProductController } from "../controllers/product-controller";
import { authMiddleware } from "../middlewares/verify-auth";

const router = Router();
const productController = new ProductController();

router.post("/find-one", authMiddleware, productController.findOne);
router.post("/find-all", authMiddleware, productController.findAll);
router.post("/save", authMiddleware, productController.save);
router.post("/update", authMiddleware, productController.update);

export default router;
