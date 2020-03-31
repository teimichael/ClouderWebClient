function login() {
    let authLogin = new ClouderWebClient.AuthLogin($('#username').val(), $('#password').val(), $('#source').val());
    let onSuccess = function (data) {
        alert(data.message);
        console.log(data);
    };
    let onFailure = function (data) {
        alert(data.message);
    };
    let callbacks = new ClouderWebClient.Callbacks(onSuccess, onFailure);
    ClouderWebClient.login(authLogin, callbacks);
}

$(function () {
    $("#login").click(function () {
        login();
    });
});

