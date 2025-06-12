import "reflect-metadata";
import express from "express";
import cors from "cors";
import sequelize from "./database/sequelize";

import companyRoutes from "../interfaces/routes/company-routes";
import userRoutes from "../interfaces/routes/user-routes";
import categoryRoutes from "../interfaces/routes/category-routes";
import productRoutes from "../interfaces/routes/product-routes";
import sellRoutes from "../interfaces/routes/sell-routes";
import sellDetailRoutes from "../interfaces/routes/sell-detail-routes";
import sellSummaryRoutes from "../interfaces/routes/sell-summary-routes";
import cashRegisterRoutes from "../interfaces/routes/cash-register-routes";
import cashMovementRoutes from "../interfaces/routes/cash-movement-routes";
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/companies", companyRoutes);
app.use("/categories", categoryRoutes);
app.use("/sells", sellRoutes);
app.use("/sell-details", sellDetailRoutes);
app.use("/sell-summary", sellSummaryRoutes);
app.use("/cash-registers", cashRegisterRoutes);
app.use("/cash-movements", cashMovementRoutes);

const serverListen = () => {
  app.listen(PORT);

  console.info("Database connected");
  console.info("Server is running on port", PORT);
  //console.info("Environment:", process.env.NODE_ENV);
};

const serverError = (error: Error) => {
  console.error("Error connecting to the database:", error);
  console.info("Environment:", process.env.NODE_ENV);
};

sequelize.sync({ force: false }).then(serverListen).catch(serverError);
