import { ImageModel } from "../models/image";

import webService from "../services/webService";

let uploadImage = (code, title, url) => {
    return new Promise(async (resolve, reject) => {
        await ImageModel.create({
            code,
            title,
            url,
        })
            .then((data) => {
                console.log(data);
                resolve({
                    status: 200,
                });
            })
            .catch((err) => {
                console.log("Err from uploadImage(): ", err);
                resolve({
                    status: 500,
                });
            });
    });
};

module.exports = {
    uploadImage,
};
