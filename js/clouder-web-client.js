;(function () {
    'use strict';
    let _global;

    const CODE = {
        success: 200,
        failure: -1
    };

    /* const SERVER = 'http://35.190.234.235:9110';*/
    const SERVER = 'http://104.198.116.231:9110';

    const URL = {
        /*login: SERVER + '/access/third/login',*/
        login: SERVER + '/access/login',
        logout: SERVER + '/access/logout',
        register: SERVER + '/access/register',
        folder: SERVER + '/folder/',
        item: SERVER + '/item/',
        search: SERVER + '/search/',
        secure: SERVER + '/secure/',
        user: SERVER + '/user/',
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
        RegisterVO: function (avatar, info, name, password, source, thirdId, username, uuid) {
            this.avatar = avatar;
            this.info = info;
            this.name = name;
            this.password = password;
            this.source = source;
            this.thirdId = thirdId;
            this.username = username;
            this.uuid = uuid;
        },
        login: function (authLogin, callbacks) {
            NAAjax.post({
                url: URL.login,
                data: JSON.stringify(authLogin),
            }).then(res=>{globalData.token = res.data;callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        logout: function (callbacks) {
            NAAjax.post({
                url: URL.logout,
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        register: function (RegisterVO, callbacks) {
            NAAjax.post({
                url: URL.register,
                data: JSON.stringify(RegisterVO),
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        getFolder: function (folderId, callbacks) {
            NAAjax.get({
                url: URL.folder + folderId,
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        getFolderContent: function ({folderId, pageParams}, callbacks) {
            NAAjax.get({
                url: URL.folder + folderId + '/content',
                query: pageParams,
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        getFolderContentByPath: function ({folderPath, pageParams}, callbacks) {
            NAAjax.get({
                url: URL.folder + 'content/by/path',
                query: {
                    folderPath: folderPath,
                    ...pageParams
                },
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        copyFolder: function ({folderId, destFolderId}, callbacks) {
            NAAjax.post({
                url: URL.folder + 'copy/' + folderId + '/to/' + destFolderId,
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        createFolder: function ({folderName, parentFolderId}, callbacks) {
            NAAjax.post({
                url: URL.folder + 'create/in/' + parentFolderId,
                query: {folderName: folderName},
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        deleteFolder: function (folderId, callbacks) {
            NAAjax.post({
                url: URL.folder + 'delete/' + folderId,
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        getFolderList: function (parentFolderId, callbacks) {
            NAAjax.get({
                url: URL.folder + 'list/' + parentFolderId,
            }).then(res=>{callbacks.onSuccess(res)},res=>{callbacks.onFailure(res)})
        },
        moveFolder: function ({folderId, destFolderId}, callbacks) {
            NAAjax.post({
                url: URL.folder + 'move/' + folderId + '/to/' + destFolderId,
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        renameFolder: function ({folderId, name}, callbacks) {
            NAAjax.post({
                url: URL.folder + 'rename/' + folderId,
                query: {name: name},
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        getItemListByItemType: function ({itemType, pageParams}, callbacks) {
            NAAjax.get({
                url: URL.item + itemType + '/list',
                query: pageParams,
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        copyItem: function ({itemId, destFolderId}, callbacks) {
            NAAjax.post({
                url: URL.item + 'copy/' + itemId + '/to/' + destFolderId,
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        deleteItem: function (itemId, callbacks) {
            NAAjax.post({
                url: URL.item + 'delete/' + itemId,
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        downloadItem: function (itemId, callbacks) {
            NAAjax.get({
                url: URL.item + 'download/' + itemId,
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        getItem: function ({itemId, pageParams}, callbacks) {
            NAAjax.get({
                url: URL.item + 'get/' + itemId,
                query: pageParams,
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        getItemListByFolderId: function ({folderId, pageParams}, callbacks) {
            NAAjax.get({
                url: URL.item + 'in/' + folderId +'/list',
                query: pageParams,
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        moveItem: function ({itemId, destFolderId}, callbacks) {
            NAAjax.post({
                url: URL.item + 'move/' + itemId + '/to/' + destFolderId,
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        previewItem: function (itemId, callbacks) {
            NAAjax.get({
                url: URL.item + 'preview/' + itemId,
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        renameItem: function ({itemId, name}, callbacks) {
            NAAjax.post({
                url: URL.item + 'rename/' + itemId,
                query: { name:name }
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        shareItem: function (itemId, callbacks) {
            NAAjax.get({
                url: URL.item + 'share/' + itemId,
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        uploadCheck: function ({folderId, name, size}, callbacks) {
            NAAjax.post({
                url: URL.item + 'upload/check',
                query: {
                    folderId: folderId,
                    name: name,
                    size: size
                },
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        /* uploadItem*/
        fuzzSearch: function ({keyword, pageParams}, callbacks) {
            NAAjax.get({
                url: URL.search + 'fuzz',
                query: {
                    keyword: keyword,
                    ...pageParams
                },
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
        getInfo: function (callbacks) {
            NAAjax.get({
                url: URL.user + 'get/info',
            }).then(res=>{callbacks.onSuccess(res)}, res=>{callbacks.onFailure(res)})
        },
    };

    (function () {
        'use strict';
        let _global;

        let NAAjax = {
            get: function () {
                let ajaxData = {
                    url: arguments[0].url || '',
                    query: arguments[0].query || null,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', globalData.token);
                    },
                    CODE_SUCCESS: CODE.success
                }
                return new Promise((resolve, reject) => {
                    NA_ajax_request({
                        type: 'GET',
                        url: buildURL(ajaxData.url, ajaxData.query),
                        dataType: 'json',
                        contentType: 'application/json',
                        beforeSend: ajaxData.beforeSend,
                        success: function (data) {
                            if (data.code === ajaxData.CODE_SUCCESS) {
                                resolve(data)
                            } else {
                                alert(data.message);
                                reject(data)
                            }
                        },
                        error: function () {
                            console.log('Get request error.')
                        }
                    })
                })
            },
            post: function () {
                let ajaxData = {
                    url: arguments[0].url || '',
                    query: arguments[0].query || null,
                    data: arguments[0].data || null,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', globalData.token);
                    },
                    CODE_SUCCESS: CODE.success
                }
                return new Promise((resolve, reject) => {
                    NA_ajax_request({
                        type: 'POST',
                        url: buildURL(ajaxData.url, ajaxData.query),
                        dataType: 'json',
                        data: ajaxData.data,
                        contentType: 'application/json',
                        beforeSend: ajaxData.beforeSend,
                        success: function (data) {
                            if (data.code === ajaxData.CODE_SUCCESS) {
                                resolve(data)
                            } else {
                                alert(data.message);
                                reject(data)
                            }
                        },
                        error: function () {
                            console.log('Post request error.')
                        }
                    })
                })
            }
        }

        function NA_ajax_request() {
            let ajaxData = {
                type: arguments[0].type || 'GET',
                url: arguments[0].url || '',
                async: arguments[0].async || 'true',
                data: arguments[0].data || null,
                query: arguments[0].query || null,
                dataType: arguments[0].dataType || 'text',
                contentType: arguments[0].contentType || 'application/x-www-form-urlencoded',
                beforeSend: arguments[0].beforeSend || function () {
                },
                success: arguments[0].success || function () {
                },
                error: arguments[0].error || function () {
                }
            };
            let xhr = createXmlHttpRequest();
            xhr.responseType = ajaxData.dataType;
            xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
            ajaxData.beforeSend(xhr)
            xhr.setRequestHeader('Content-Type', ajaxData.contentType);
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

        function createXmlHttpRequest() {
            if (window.ActiveXObject) {
                return new ActiveXObject('Microsoft.XMLHTTP');
            } else if (window.XMLHttpRequest) {
                return new XMLHttpRequest();
            }
        }

        function convertData(data) {
            if (typeof data === 'object') {
                let convertResult = "";
                for (let c in data) {
                    convertResult += c + '=' + data[c] + '&';
                }
                convertResult = convertResult.substring(0, convertResult.length - 1)
                return convertResult;
            } else {
                return data;
            }
        }

        function buildURL(url, params) {
            if (!params) {
                return url;
            }
            const parts = []
            for(let key in params) {
                parts.push(encode(key) + '=' + encode(params[key]))
            }
            console.log(url + '?' + parts.join('&'))
            return url + '?' + parts.join('&')
        }

        function encode(val) {
            return encodeURIComponent(val).
            replace(/%40/gi, '@').
            replace(/%3A/gi, ':').
            replace(/%24/g, '$').
            replace(/%2C/gi, ',').
            replace(/%20/g, '+').
            replace(/%5B/gi, '[').
            replace(/%5D/gi, ']');
        }

        _global = (function () {
            return this || (0, eval)('this');
        }());
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = ClouderWebClient;
        } else if (typeof define === 'function' && define.amd) {
            define(function () {
                return ClouderWebClient;
            });
        } else {
            !('NAAjax' in _global) && (_global.NAAjax = NAAjax);
        }
    }())

    _global = (function () {
        return this || (0, eval)('this');
    }());
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = ClouderWebClient;
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return ClouderWebClient;
        });
    } else {
        !('ClouderWebClient' in _global) && (_global.ClouderWebClient = ClouderWebClient);
    }
}());
