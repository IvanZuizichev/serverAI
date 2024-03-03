$(window).on('load', () => {
    socket = io.connect();
    socket.on("percentage", (m) => {
        $.ajax({
            url: "/get_progress",
            method: "get",
        }).done(resp => {
            $("#percentage").text(`${resp.progress}%`);
            $("#progressbar > div").css("width", `${resp.progress}%`);
        });
    });
    socket.on("image", (m) => {
            $("#preview_front").css("background-image", "url('/tmp_img/" + Math.random().toString(36).substr(2, 5)) + "')";
    });
    function check() {
        $.ajax({
                url: "/check",
                method: "get",
            }).done(resp => {
                if (resp.state == "WAIT") {
                    setTimeout(check, 1000);
                };
                if (resp.state == "READY") {
                    $(".result > div").css("background-image", "url('/ready/" + Math.random().toString(36).substr(2, 5) + "')");
                    $(".container").hide();
                    $(".result").show();
                    setTimeout(back, 1000 * 60 * 1);
                    $(document).click(() => {
                        clearTimeout(window.back_timeout);
                        window.back_timeout = setTimeout(back, 1000 * 60 * 1);
                    });
                };
            });
        }
    socket.on("ready", (m) => {
        check()
    })
});

