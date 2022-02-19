import { CollectionModel } from "../models/collection";
import { ImageModel } from "../models/image";

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

let updatePass = (code, currentPassword, newPassword) => {
    return new Promise(async (resolve, reject) => {
        await CollectionModel.updateOne(
            {
                code: code,
                password: currentPassword,
            },
            {
                password: newPassword,
            }
        )
            .then((data) => {
                console.log("Data from updatePass(): ", data);

                if (data.modifiedCount === 0) {
                    resolve({
                        status: 404,
                    });
                    return;
                }
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

let updateShareState = (code, password, state) => {
    return new Promise(async (resolve, reject) => {
        await CollectionModel.updateOne(
            {
                code: code,
                password: password,
            },
            {
                isShared: state,
            }
        )
            .then((data) => {
                // console.log("Data from updateShareState(): ", data);

                if (data.modifiedCount === 0) {
                    resolve({
                        status: 404,
                    });
                    return;
                }
                resolve({
                    status: 200,
                });
            })
            .catch((err) => {
                console.log("Err from updateShareState(): ", err);
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
    updatePass,
    updateShareState,
};
