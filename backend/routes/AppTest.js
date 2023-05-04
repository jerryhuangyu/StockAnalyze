import express from 'express';

const appTestRouter = express.Router();

appTestRouter.get('/', (req, res) => {
    res
        .status(200)
        .send({
            message: 'Hello from stock visual backend',
        })
});

export default appTestRouter;