import { CollectionModel } from "../models/collection";
import { ImageModel } from "../models/image";

let createCollection = (code) => {
    return new Promise(async (resolve, reject) => {
        await CollectionModel.create({
            code: code,
        })
            .then((data) => {
                // console.log(data);
                resolve({
                    status: 200,
                });
            })
            .catch((err) => {
                console.log("Err from createCollection(): ", err);
                resolve({
                    status: 500,
                });
            });
    });
};

let checkCollectionExist = (code) => {
    return new Promise(async (resolve, reject) => {
        await CollectionModel.findOne({
            code: code,
        })
            .then((data) => {
                if (!data) {
                    resolve({
                        status: 200,
                        exist: false,
                    });
                    return;
                }
                resolve({
                    status: 200,
                    exist: true,
                });
            })
            .catch((err) => {
                console.log("Err from checkCollectionExist(): ", err);
                resolve({
                    status: 500,
                    exist: false,
                });
            });
    });
};

let getAllImagesByCode = (code) => {
    return new Promise(async (resolve, reject) => {
        let { status, exist } = await checkCollectionExist(code);
        if (status === 500) {
            resolve({
                status: 500,
                images: null,
            });
            return;
        }

        if (!exist) {
            let { status } = await createCollection(code);
            if (status === 500) {
                resolve({
                    status: 500,
                    images: null,
                });
                return;
            }
        }

        await ImageModel.find({
            code: code,
        })
            .then((data) => {
                // console.log(data);
                resolve({
                    status: 200,
                    images: data,
                });
            })
            .catch((err) => {
                console.log("Err from getAllImagesByCode(): ", err);
                resolve({
                    status: 500,
                    images: null,
                });
            });
    });
};

let checkPass = (code, password) => {
    return new Promise(async (resolve, reject) => {
        await CollectionModel.findOne({
            code: code,
            password: password,
        })
            .then((data) => {
                console.log(data);
                if (!data) {
                    resolve({
                        status: 200,
                        result: false,
                    });
                    return;
                }
                resolve({
                    status: 200,
                    result: true,
                });
            })
            .catch((err) => {
                console.log("Err from checkPass(): ", err);
                resolve({
                    status: 500,
                    result: null,
                });
            });
    });
};

let getCollectionByCode = (code) => {
    return new Promise(async (resolve, reject) => {
        await CollectionModel.findOne({
            code: code,
        })
            .then((data) => {
                resolve({
                    result: true,
                    data: data,
                });
            })
            .catch((err) => {
                console.log("Err from getCollectionByCode(): ", err);
                resolve({
                    result: false,
                    data: {},
                });
            });
    });
};

module.exports = {
    createCollection,
    getAllImagesByCode,
    checkPass,
    getCollectionByCode,
};
