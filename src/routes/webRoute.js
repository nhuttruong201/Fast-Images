import express from "express";
import webController from "../controllers/webController";
import webMiddleware from "../middlewares/webMiddleware";

const router = express.Router();

let initWebRoute = (app) => {
    router.get("/", (req, res) => {
        res.redirect("/" + randomId(5));
        return;
    });

    router.get("/:code", webMiddleware.checkPass, webController.getViewPage);
    router.post("/:code", webController.handleCheckPass);

    router.get(
        "/share/:code",
        webMiddleware.checkPass,
        webController.getSharePage
    );

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
