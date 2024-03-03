if (window.location.href.indexOf("result") == -1) {
    $(document).ready(() => { window.back_timeout = setTimeout(back, 1000 * 60 * 10)});
    $(document).click(() => {
        clearTimeout(window.back_timeout);
        window.back_timeout = setTimeout(back, 1000 * 60 * 10);
    });
}
back = () => {window.location.href = "/"}
