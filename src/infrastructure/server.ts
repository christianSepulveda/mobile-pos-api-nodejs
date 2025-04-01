import "reflect-metadata";
import express from "express";
import sequelize from "./database/sequelize";

import companyRoutes from "../interfaces/routes/company-routes";
import userRoutes from "../interfaces/routes/user-routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/companies", companyRoutes);
app.use("/user", userRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT);
});
