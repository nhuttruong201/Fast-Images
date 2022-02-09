import webService from "../services/webService";

let getViewPage = async (req, res) => {
    let code = req.params.code;
    let { status, images } = await webService.getAllImagesByCode(code);

    res.render("viewPage", {
        code: code,
        data: images.reverse(),
    });
};

module.exports = {
    getViewPage,
};
