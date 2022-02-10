import { CollectionModel } from "../models/collection";

let checkPass = async (req, res, next) => {
    let { code } = req.params;
    await CollectionModel.findOne({
        code: code,
    })
        .then((data) => {
            // console.log(data);
            if (!data || data.password === "") {
                next();
                return;
            }
            res.render("checkPassPage", {
                code: code,
                password: null,
                message: null,
            });
        })
        .catch((err) => {
            console.log("Err from checkPass(): ", err);
            res.status(500).json({
                errMessage: err,
            });
        });
};

module.exports = {
    checkPass,
};
