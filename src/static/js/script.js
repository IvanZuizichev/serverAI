$(window).on('load', function () {
    $("#ai-sub-form").submit(e => {
        e.preventDefault();
        $.ajax({
            url: "/create",
            method: "post",
            data: $("#ai-sub-form").serialize()
        }).done(resp => {
            if (resp == "BANWORD") {
                $("#prompt").val("Запрос содержит запрещённые слова")
            };
            if (resp == "OK") {
                $("#f-container").hide();
                $("#progress").text("Прогресс: 0%");
                $("#l-container").show();
                setTimeout(check, 1000);
            };
        });
    });
    function check() {
        $.ajax({
            url: "/check",
            method: "get",
        }).done(resp => {
            if (resp.state == "WAIT") {
                $("#progress").text(`Прогресс: ${resp.progress}%`);
                setTimeout(check, 5000);
            };
            if (resp.state == "READY") {
                $("#l-container").hide();
                $("#ready-image").css("background-image", "url('/ready/" + Math.random().toString(36).substr(2, 5) + "')");
                $("#r-container").show();
            };
        });
    };
    $("#reset-btn").click(() => {
        $("#r-container").hide();
        $("#prompt").val('');
        $("#f-container").show();
    })
});
