import express from "express";

import apiController from "../controllers/apiController";

const router = express.Router();

let initApiRoute = (app) => {
    router.post("/upload-image", apiController.handleUploadImage);

    app.use("/api", router);
};

export default initApiRoute;
