import express from "express";

import apiController from "../controllers/apiController";

const router = express.Router();

let initApiRoute = (app) => {
    router.post("/upload-image", apiController.handleUploadImage);
    router.post("/edit-image-title", apiController.handleEditImageTitle);
    router.post("/delete-image", apiController.handleDeleteImage);
    router.post("/update-pass", apiController.handleUpdatePass);
    router.post("/update-share-state", apiController.handleUpdateShareState);

    app.use("/api", router);
};

export default initApiRoute;
