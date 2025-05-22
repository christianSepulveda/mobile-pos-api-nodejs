import { Router } from "express";
import { CashRegisterController } from "../controllers/cash-register-controller";

const router = Router();
const cashRegisterController = new CashRegisterController();

router.post("/save", cashRegisterController.save);
router.post("/update", cashRegisterController.update);
router.post("/find-one", cashRegisterController.findOne);
router.post("/find-all", cashRegisterController.findAll);

export default router;
