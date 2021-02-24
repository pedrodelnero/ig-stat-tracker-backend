import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import routes from "./routes/routers.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

app.listen(port, () => console.log(`listening in port ${port}`));
