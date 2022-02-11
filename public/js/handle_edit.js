$(document).ready(() => {
    $(".btn-edit").click((e) => {
        e.preventDefault();
        let button = $(e.target);

        let imageId = button.attr("data-id");
        let imageUrl = button.attr("data-url");
        let imageTitle = $(`#title_${imageId}`).text().trim(); //button.attr("data-title");

        console.log(imageUrl, imageTitle, imageId);

        $("#img_title_edit").html(imageTitle);
        $("#image_title_input").val(imageTitle);
        $("#img_edit").attr("src", imageUrl);
        $("#image_edit_id").val(imageId);
    });

    $("#btn_update").click(() => {
        let id = $("#image_edit_id").val();
        let title = $("#image_title_input").val().trim();
        if (title === "") {
            bootbox.alert("Tiêu đề không được để trống!");
            return;
        }

        handleEditImageTitle(id, title);
    });
});

let handleEditImageTitle = (imageId, imageTitle) => {
    $.post("/api/edit-image-title", {
        _id: imageId,
        title: imageTitle,
    })
        .done((data) => {
            // console.log(data);
            if (data.status === 200) {
                // location.reload();
                $(`#title_${imageId}`).html(imageTitle);
                showNotiModal("edit", true, "Cập nhật thành công!");
                return;
            }
            showNotiModal("edit", false, "Máy chủ gặp sự cố!");
        })
        .fail((err) => {
            showNotiModal("edit", false, "Máy chủ gặp sự cố!");
            console.log(err);
        });
};
