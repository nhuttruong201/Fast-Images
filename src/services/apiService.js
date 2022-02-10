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

let editImageTitle = (_id, title) => {
    return new Promise(async (resolve, reject) => {
        await ImageModel.updateOne(
            {
                _id: _id,
            },
            {
                title: title,
            }
        )
            .then((data) => {
                // console.log(data);
                resolve({
                    status: 200,
                });
            })
            .catch((err) => {
                console.log("Err from editImageTitle(): ", err);
                resolve({
                    status: 500,
                });
            });
    });
};

let deleteImage = (_id) => {
    return new Promise(async (resolve, reject) => {
        await ImageModel.deleteOne({
            _id: _id,
        })
            .then((data) => {
                // console.log(data);
                resolve({
                    status: 200,
                });
            })
            .catch((err) => {
                console.log("Err from deleteImage(): ", err);
                resolve({
                    status: 500,
                });
            });
    });
};

module.exports = {
    uploadImage,
    editImageTitle,
    deleteImage,
};
