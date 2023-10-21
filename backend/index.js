import express from "express";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";
import * as dotenv from "dotenv";
import {
  appTestRouter,
  stockRouter,
  stocksRouter,
  symbolRouter,
} from "./routes/index.js";

dotenv.config();

const jwtCheck = auth({
  audience: process.env.AUTH_AUDIENCE,
  issuerBaseURL: process.env.AUTH_ISSUER_BASE_URL,
  tokenSigningAlg: process.env.AUTH_ALG,
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(jwtCheck);

app.use("/stocks", stocksRouter);
app.use("/stock", stockRouter);
app.use("/symbol", symbolRouter);
app.use("/test", appTestRouter);

app.listen(8080, () => console.log("backend is running"));
