let showNotiModal = (modalName, boolean, message) => {
    let strModalName = String(modalName).toUpperCase();
    let boxId = "#box_noti_modal_";
    let iconId = "#icon_noti_modal_";
    let contentId = "#content_noti_modal_";
    if (strModalName === "SHARE") {
        boxId += "share";
        iconId += "share";
        contentId += "share";
    } else if (strModalName === "SECURITY") {
        boxId += "security";
        iconId += "security";
        contentId += "security";
    } else if (strModalName === "BACKUP") {
        boxId += "backup";
        iconId += "backup";
        contentId += "backup";
    } else if (strModalName === "CHECKPASS") {
        boxId += "check_pass";
        iconId += "check_pass";
        contentId += "check_pass";
    }

    if (boolean === false) {
        $(iconId).html('<i class="far fa-frown"></i>');
        $(boxId).removeClass("alert-success");
        $(boxId).addClass("alert-danger");
    } else {
        $(iconId).html('<i class="fas fa-check"></i>');
        $(boxId).removeClass("alert-danger");
        $(boxId).addClass("alert-success");
    }

    $(contentId).html(message);

    $(boxId).hide();
    $(boxId).fadeIn();
    setTimeout(() => {
        $(boxId).fadeOut();
    }, 5000);
};
