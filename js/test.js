function login() {
    let authLogin = new ClouderWebClient.AuthLogin($('#username').val(), $('#password').val(), $('#source').val());
    let onSuccess = function (data) {
        alert(data.message);
        console.log(data);
        const pageParams = {
            page: 0,
            size: 20
        }
        let fnCallbacksOnSuccess = function (data) {
            console.log(data);
        }
        let fnCallbacks = new ClouderWebClient.Callbacks(fnCallbacksOnSuccess);
        ClouderWebClient.getInfo(fnCallbacks)
        /* ClouderWebClient.createFolder({folderName:'Folder1', parentFolderId:'2'}, fnCallbacks)*/
        ClouderWebClient.getFolderList(2, fnCallbacks)
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

