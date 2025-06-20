import { Router } from "express";
import { SellSummaryController } from "../controllers/sell-summary-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();
const sellSummaryController = new SellSummaryController();

router.post(
  "/find-sell-summary",
  authMiddleware,
  sellSummaryController.findSellSumaryByDate
);

export default router;
