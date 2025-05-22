import { Router } from "express";
import { SellController } from "../controllers/sell-controller";

const router = Router();
const sellController = new SellController();

router.post("/save", sellController.save);
router.post("/update", sellController.update);
router.post("/find-one", sellController.findOne);
router.post("/find-all", sellController.findAll);

export default router;
