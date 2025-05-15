import { Router } from "express";
import { SellDetailController } from "../controllers/sell-detail-controller";
import { authMiddleware } from "../middlewares/verify-auth";

const router = Router();
const sellDetailController = new SellDetailController();

router.post("/save", authMiddleware, sellDetailController.save);
router.post("/update", authMiddleware, sellDetailController.update);
router.post("/find-one", authMiddleware, sellDetailController.findOne);
router.post(
  "/find-all-by-sellid",
  authMiddleware,
  sellDetailController.findAllBySellId
);

export default router;
