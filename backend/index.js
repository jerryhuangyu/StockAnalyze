import express from "express";
import cors from 'cors';

import { appTestRouter, stockRouter, stocksRouter, symbolRouter } from './routes/index.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/stocks', stocksRouter);
app.use('/stock', stockRouter);
app.use('/symbol', symbolRouter);
app.use('/test', appTestRouter);

app.listen(8080, () => console.log("backend is running"))