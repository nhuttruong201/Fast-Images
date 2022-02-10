$(document).ready(() => {
    $(".btn-view").click((e) => {
        e.preventDefault();
        let button = $(e.target);
        let imageUrl = button.attr("data-url");
        let imageTitle = button.attr("data-title");
        console.log(imageUrl);

        $("#img_title").html(imageTitle);
        $("#img_view").attr("src", imageUrl);
    });

    $(".img-thumb").click((e) => {
        e.preventDefault();
        let button = $(e.target);
        let imageUrl = button.attr("data-url");
        let imageTitle = button.attr("data-title");
        console.log(imageUrl);

        $("#img_title").html(imageTitle);
        $("#img_view").attr("src", imageUrl);
    });
});
