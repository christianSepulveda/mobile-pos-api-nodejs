import { Router } from "express";
import { CashRegisterController } from "../controllers/cash-register-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();
const cashRegisterController = new CashRegisterController();

router.post("/save", authMiddleware, cashRegisterController.save);
router.post("/update", authMiddleware, cashRegisterController.update);
router.post("/find-one", authMiddleware, cashRegisterController.findOne);
router.post("/find-all", authMiddleware, cashRegisterController.findAll);

export default router;
