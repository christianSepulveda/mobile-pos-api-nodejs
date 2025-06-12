import { Router } from "express";
import { SellController } from "../controllers/sell-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();
const sellController = new SellController();

router.post("/save", authMiddleware, sellController.save);
router.post("/update", authMiddleware, sellController.update);
router.post("/find-one", authMiddleware, sellController.findOne);
router.post("/find-all", authMiddleware, sellController.findAll);

export default router;
