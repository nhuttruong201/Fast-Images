import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import "dotenv/config";

import initWebRoute from "./src/routes/webRoute";
import initApiRoute from "./src/routes/apiRoute";

const app = express();

// config static file
app.use(express.static("./public"));

// config view engine
app.set("view engine", "ejs");
app.set("views", "./src/views");

// config body parser
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

// config router
initWebRoute(app);
initApiRoute(app);

const PORT = process.env.PORT || 5000;

// TODO connect mongodb
mongoose
    .connect(process.env.MONGOOSE_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to mongoose!!!");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Err from connect DB: ", err);
    });
