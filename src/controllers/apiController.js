import apiService from "../services/apiService";

let handleUploadImage = async (req, res) => {
    let { code, title, url } = req.body;

    console.log("Check body: ", req.body);

    let { status } = await apiService.uploadImage(code, title, url);

    res.status(status).json({
        status,
    });
};

module.exports = {
    handleUploadImage,
};
