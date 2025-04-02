import { Router } from "express";
import { SellSummaryController } from "../controllers/sell-summary-controller";

const router = Router();
const sellSummaryController = new SellSummaryController();

router.post("/find-sell-summary", sellSummaryController.findSellSumaryByDate);

export default router;
