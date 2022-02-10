import apiService from "../services/apiService";

let handleUploadImage = async (req, res) => {
    let { code, title, url } = req.body;

    console.log("Check body: ", req.body);

    let { status } = await apiService.uploadImage(code, title, url);

    res.status(status).json({
        status,
    });
};

let handleEditImageTitle = async (req, res) => {
    let { _id, title, password } = req.body;
    console.log(req.body);

    let { status } = await apiService.editImageTitle(_id, title);

    res.status(status).json({
        status,
    });
};

let handleDeleteImage = async (req, res) => {
    let { _id } = req.body;
    let { status } = await apiService.deleteImage(_id);
    res.status(status).json({
        status,
    });
};

module.exports = {
    handleUploadImage,
    handleEditImageTitle,
    handleDeleteImage,
};
