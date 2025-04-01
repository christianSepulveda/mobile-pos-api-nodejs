import { Router } from "express";
import { ProductController } from "../controllers/product-controller";

const router = Router();
const productController = new ProductController();

router.post("/find-one", productController.findOne);
router.post("/find-all", productController.findAll);
router.post("/save", productController.save);
router.post("/update", productController.update);

export default router;
