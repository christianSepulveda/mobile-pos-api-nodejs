import { Router } from "express";
import { CompanyController } from "../controllers/company-controller";

const router = Router();
const companyController = new CompanyController();

router.post("/find", companyController.find);
router.post("/save", companyController.save);
router.post("/update", companyController.update);

export default router;
