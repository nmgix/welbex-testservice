import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cookies from "cookie-parser";
dotenv.config({ path: `${__dirname}/../.env` });
import { AuthorizationRouter } from "./routers";

import { sequelize } from "./helper/createDatabaseConnection";

sequelize
  .authenticate()
  .then(() => console.log("Sequelize connection generated successfully"))
  .catch(() => {
    throw new Error("Sequelize error occured");
  });

const app = express();

app.use(helmet());
app.use(cookies());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(AuthorizationRouter);

const port = process.env.PORT ? process.env.PORT : 8080;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
