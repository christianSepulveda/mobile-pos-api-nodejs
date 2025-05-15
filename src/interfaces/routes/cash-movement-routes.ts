import { Router } from "express";
import { CashMovementController } from "../controllers/cash-movement-controller";
import { authMiddleware } from "../middlewares/verify-auth";

const router = Router();
const cashMovementController = new CashMovementController();

router.post("/save", authMiddleware, cashMovementController.save);
router.post("/update", authMiddleware, cashMovementController.update);
router.post("/find-all", authMiddleware, cashMovementController.findAll);

export default router;
