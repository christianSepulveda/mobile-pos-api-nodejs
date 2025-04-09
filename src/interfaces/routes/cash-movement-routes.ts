import { Router } from "express";
import { CashMovementController } from "../controllers/cash-movement-controller";

const router = Router();
const cashMovementController = new CashMovementController();

router.post("/save", cashMovementController.save);
router.post("/update", cashMovementController.update);
router.post("/find-all", cashMovementController.findAll);

export default router;
