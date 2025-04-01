import "reflect-metadata";
import express from "express";
import sequelize from "./database/sequelize";

import companyRoutes from "../interfaces/routes/company-routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/companies", companyRoutes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Database connected!");
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
