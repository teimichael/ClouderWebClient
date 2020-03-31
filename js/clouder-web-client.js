;(function () {
    "use strict";
    let _global;

    const CODE = {
        success: 200,
        failure: -1
    };

    const SERVER = 'http://104.198.116.231:9110';

    const URL = {
        login: SERVER + '/access/third/login',
        logout: SERVER + '/access/logout'
    };

    let globalData = {
        token: ''
    };

    let ClouderWebClient = {
        Callbacks: function (onSuccess, onFailure) {
            this.onSuccess = onSuccess;
            this.onFailure = onFailure;
        },
        AuthLogin: function (username, password, source) {
            this.username = username;
            this.password = password;
            this.source = source;
        },
        login: function (authRegister, callbacks) {
            NA_ajax({
                type: "POST",
                url: URL.login,
                dataType: "json",
                data: JSON.stringify(authRegister),
                contentType: 'application/json',
                success: function (data) {
                    if (data.code === CODE.success) {
                        globalData.token = data.data;
                        callbacks.onSuccess(data)
                    } else {
                        callbacks.onFailure(data)
                    }
                },
                error: function () {
                    console.log("login error")
                }
            })
        },
        logout: function () {
            NA_ajax({
                type: "POST",
                url: URL.logout,
                dataType: "json",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('Logout successfully.');
                    } else {
                        alert(data.message);
                    }
                },
                error: function () {
                    console.log("Logout error")
                }
            })
        }
    };

    function NA_ajax() {
        let ajaxData = {
            type: arguments[0].type || "GET",
            url: arguments[0].url || "",
            async: arguments[0].async || "true",
            data: arguments[0].data || null,
            dataType: arguments[0].dataType || "text",
            contentType: arguments[0].contentType || "application/x-www-form-urlencoded",
            beforeSend: arguments[0].beforeSend || function () {
            },
            success: arguments[0].success || function () {
            },
            error: arguments[0].error || function () {
            }
        };
        let xhr = createxmlHttpRequest();
        xhr.responseType = ajaxData.dataType;
        xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
        ajaxData.beforeSend(xhr)
        xhr.setRequestHeader("Content-Type", ajaxData.contentType);
        xhr.send(convertData(ajaxData.data));
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    ajaxData.success(xhr.response)
                } else {
                    ajaxData.error(xhr.response)
                }
            }
        }
    }

    function createxmlHttpRequest() {
        if (window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP");
        } else if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        }
    }

    function convertData(data) {
        if (typeof data === 'object') {
            let convertResult = "";
            for (let c in data) {
                convertResult += c + "=" + data[c] + "&";
            }
            convertResult = convertResult.substring(0, convertResult.length - 1)
            return convertResult;
        } else {
            return data;
        }
    }

    _global = (function () {
        return this || (0, eval)('this');
    }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = ClouderWebClient;
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return ClouderWebClient;
        });
    } else {
        !('ClouderWebClient' in _global) && (_global.ClouderWebClient = ClouderWebClient);
    }
}());
