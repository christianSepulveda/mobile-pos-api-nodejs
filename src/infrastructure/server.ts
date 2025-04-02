import "reflect-metadata";
import express from "express";
import sequelize from "./database/sequelize";

import companyRoutes from "../interfaces/routes/company-routes";
import userRoutes from "../interfaces/routes/user-routes";
import categoryRoutes from "../interfaces/routes/category-routes";
import productRoutes from "../interfaces/routes/product-routes";
import sellRoutes from "../interfaces/routes/sell-routes";
import sellDetailRoutes from "../interfaces/routes/sell-detail-routes";
import sellSummaryRoutes from "../interfaces/routes/sell-summary-routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/user", userRoutes);
app.use("/products", productRoutes);
app.use("/companies", companyRoutes);
app.use("/categories", categoryRoutes);
app.use("/sells", sellRoutes);
app.use("/sell-details", sellDetailRoutes);
app.use("/sell-summary", sellSummaryRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT);
});
