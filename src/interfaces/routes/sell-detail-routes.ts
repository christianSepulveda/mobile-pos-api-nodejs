import { Router } from "express";
import { SellDetailController } from "../controllers/sell-detail-controller";

const router = Router();
const sellDetailController = new SellDetailController();

router.post("/save", sellDetailController.save);
router.post("/update", sellDetailController.update);
router.post("/find-one", sellDetailController.findOne);
router.post("/find-all-by-sellid", sellDetailController.findAllBySellId);

export default router;
