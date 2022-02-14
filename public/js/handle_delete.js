$(document).ready(() => {
    $(".btn-delete").click((e) => {
        e.preventDefault();
        let button = $(e.target);

        let imageId = button.attr("data-id");
        let imageTitle = button.attr("data-title");
        let imageUrl = button.attr("data-url");

        console.log(imageId, imageTitle);

        $("#image_title_delete").html(imageTitle);
        $("#image_id_delete").val(imageId);
        $("#image_view_delete").attr("src", imageUrl);

        // bootbox.confirm({
        //     title: "Bạn có chắc xoá?",
        //     message: `<strong>${imageTitle}</strong> sẽ bị xoá vĩnh viễn, cân nhắc kĩ trước khi thực hiện.`,
        //     buttons: {
        //         cancel: {
        //             label: '<i class="fa fa-times"></i> Huỷ',
        //             className: "btn btn-sm btn-secondary",
        //         },
        //         confirm: {
        //             label: '<i class="fas fa-trash"></i> Chấp nhận xoá',
        //             className: "btn btn-sm btn-danger",
        //         },
        //     },
        //     callback: function (result) {
        //         // console.log("This was logged in the callback: " + result);
        //         if (result) {
        //             handleDeleteImage(imageId);
        //         }
        //     },
        // });
    });

    $("#btn-submit-delete").click(() => {
        let imageDeleteId = $("#image_id_delete").val();
        handleDeleteImage(imageDeleteId);
    });
});

let handleDeleteImage = (_id) => {
    $.post("/api/delete-image", {
        _id,
    })
        .done((data) => {
            if (data.status === 200) {
                // location.reload();
                $(`#item_${_id}`).hide(200);
                $(`#item_${_id}`).remove();
                return;
            }
            bootbox.alert("Đã xảy ra lỗi! Vui lòng thử lại sau!");
        })
        .fail((err) => {
            console.log(err);
            bootbox.alert("Đã xảy ra lỗi! Vui lòng thử lại sau!");
        });
};
