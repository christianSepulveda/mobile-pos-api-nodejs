import { Router } from "express";
import { CompanyController } from "../controllers/company-controller";
import { authMiddleware } from "../middlewares/verify-auth";

const router = Router();
const companyController = new CompanyController();

router.post("/find", authMiddleware, companyController.find);
router.post("/save", companyController.save);
router.post("/update", authMiddleware, companyController.update);
router.post("/validate", authMiddleware, companyController.isValidAdminCode);

export default router;
