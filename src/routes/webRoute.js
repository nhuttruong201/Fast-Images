import express from "express";
import webController from "../controllers/webController";

const router = express.Router();

let initWebRoute = (app) => {
    router.get("/:code", webController.getViewPage);

    router.get("/", (req, res) => {
        res.redirect("/" + randomId(5));
    });

    app.use("/", router);
};

let randomId = (length) => {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
};

export default initWebRoute;
