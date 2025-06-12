import { Router } from "express";
import { CompanyController } from "../controllers/company-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

const router = Router();
const companyController = new CompanyController();

router.post("/find", authMiddleware, companyController.find);
router.post("/save", authMiddleware, companyController.save);
router.post("/update", authMiddleware, companyController.update);
router.post("/validate", authMiddleware, companyController.isValidAdminCode);

export default router;
