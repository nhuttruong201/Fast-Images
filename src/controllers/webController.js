import webService from "../services/webService";

let getViewPage = async (req, res) => {
    let code = String(req.params.code).toLowerCase();
    let password = req.password || null;

    let { result, data } = await webService.getCollectionByCode(code);
    // console.log("Check data from getViewPage(): ", data);

    let { status, images } = await webService.getAllImagesByCode(code);

    res.render("_layout", {
        pageRender: "viewPage",
        title: `Fast Image - ${code}`,
        code: code,
        password: password,
        isShared: data.isShared,
        images: images.reverse(),
    });
};

let handleCheckPass = async (req, res) => {
    let { code, password } = req.body;
    let { status, result } = await webService.checkPass(code, password);

    if (status === 500) {
        res.render("checkPassPage", {
            code: code,
            password: password,
            message: "Máy chủ gặp sự cố!",
        });
        return;
    }

    if (!result) {
        res.render("checkPassPage", {
            code: code,
            password: password,
            message: "Mật khẩu không đúng!",
        });
        return;
    }

    req.password = password;

    await getViewPage(req, res);
};

let getSharePage = async (req, res) => {
    let code = String(req.params.code).toLowerCase();
    let password = req.password || null;

    let { result, data } = await webService.getCollectionByCode(code);
    let { status, images } = await webService.getAllImagesByCode(code);

    res.render("_layout", {
        pageRender: "sharePage",
        title: `Fast Image Sharing - ${code}`,
        code: code,
        password: password,
        isShared: data.isShared,
        images: images.reverse(),
    });
};

module.exports = {
    getViewPage,
    handleCheckPass,
    getSharePage,
};
