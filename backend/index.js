import express from "express";
import cors from "cors";
import { expressjwt as jwt } from "express-jwt";
import * as jwks from "jwks-rsa";
import * as dotenv from "dotenv";
import {
  appTestRouter,
  stockRouter,
  stocksRouter,
  symbolRouter,
} from "./routes/index.js";

dotenv.config();

const verifyJwt = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${process.env.AUTH_ISSUER_BASE_URL}.well-known/jwks.json`,
  }),
  audience: process.env.AUTH_AUDIENCE,
  issuer: process.env.AUTH_ISSUER_BASE_URL,
  algorithms: [process.env.AUTH_ALG],
}).unless({ path: ["/test"] });

const app = express();
app.use(express.json());
app.use(cors());
app.use(verifyJwt);

app.use("/stocks", stocksRouter);
app.use("/stock", stockRouter);
app.use("/symbol", symbolRouter);
app.use("/test", appTestRouter);

app.listen(8080, () => console.log("backend is running"));
