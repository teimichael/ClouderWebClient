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
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            NA_ajax({
                type: 'POST',
                url: URL.login,
                dataType: 'json',
                data: JSON.stringify(authLogin),
                contentType: 'application/json',
                success: function (data) {
                    if (data.code === CODE.success) {
                        globalData.token = data.data;
                        onSuccess(data)
                    } else {
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('login error')
                }
            })
        },
        logout: function () {
            NA_ajax({
                type: 'POST',
                url: URL.logout,
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('Logout successfully.');
                    } else {
                        alert(data.message);
                    }
                },
                error: function () {
                    console.log('Logout error')
                }
            })
        },
        register: function (RegisterVO, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            NA_ajax({
                type: 'POST',
                url: URL.register,
                dataType: 'json',
                data: JSON.stringify(RegisterVO),
                contentType: 'application/json',
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('Register successfully.');
                        onSuccess(data)
                    } else {
                        alert(data.message);
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('Register error')
                }
            })
        },
        getFolder: function (folderId, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            NA_ajax({
                type: 'GET',
                url: URL.folder + folderId,
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('Get folder successfully.');
                        onSuccess(data)
                    } else {
                        alert(data.message);
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('Get folder error')
                }
            })
        },
        getFolderContent: function ({folderId, pageParams}, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            let pageInfo = {
                page: pageParams.page,
                size: pageParams.size
            }
            NA_ajax({
                type: 'GET',
                url: URL.folder + folderId + '/content',
                dataType: 'json',
                contentType: 'application/json',
                query: pageInfo,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('Get folder successfully.');
                        onSuccess(data)
                    } else {
                        alert(data.message);
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('Get folder error')
                }
            })
        },
        getFolderContentByPath: function ({folderPath, pageParams}, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            let folderInfo = {
                folderPath: folderPath,
                page: pageParams.page,
                size: pageParams.size
            }
            console.log(JSON.stringify(folderInfo))
            NA_ajax({
                type: 'GET',
                url: URL.folder + 'content/by/path',
                dataType: 'json',
                /*data: 'folderPath=root%2F&page=0&size=20',*/
                query: folderInfo,
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('Get folder successfully.');
                        onSuccess(data)
                    } else {
                        alert(data.message);
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('Get folder error')
                }
            })
        },
        copyFolder: function ({folderId, destFolderId}, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            NA_ajax({
                type: 'POST',
                url: URL.folder + 'copy/' + folderId + '/to/' + destFolderId,
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('copy successful')
                        onSuccess(data)
                    } else {
                        console.log('copy failed')
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('copy error')
                }
            })
        },
        createFolder: function ({folderName, parentFolderId}, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            NA_ajax({
                type: 'POST',
                url: URL.folder + 'create/in/' + parentFolderId,
                dataType: 'json',
                query: {folderName: folderName},
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('create folder successful')
                        onSuccess(data)
                    } else {
                        console.log('create folder failed')
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('create folder error')
                }
            })
        },
        deleteFolder: function (folderId, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            NA_ajax({
                type: 'POST',
                url: URL.folder + 'delete/' + folderId,
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('delete folder successful')
                        onSuccess(data)
                    } else {
                        console.log('delete folder failed')
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('delete folder error')
                }
            })
        },
        getFolderList: function (parentFolderId, callbacks) {
            /* let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}*/
            NAAjax.get({
                url: URL.folder + 'list/' + parentFolderId,
            }).then(res=>{callbacks.onSuccess(res)},res=>{callbacks.onFailure(res)})
            /* NA_ajax({
                type: 'GET',
                url: URL.folder + 'list/' + parentFolderId,
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('Get folder list successfully.');
                        onSuccess(data)
                    } else {
                        alert(data.message);
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('Get folder list error')
                }
            })*/
        },
        moveFolder: function ({folderId, destFolderId}, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            NA_ajax({
                type: 'POST',
                url: URL.folder + 'move/' + folderId + '/to/' + destFolderId,
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('copy successful')
                        onSuccess(data)
                    } else {
                        console.log('copy failed')
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('copy error')
                }
            })
        },
        renameFolder: function ({folderId, name}, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            NA_ajax({
                type: 'POST',
                url: URL.folder + 'rename/' + folderId,
                dataType: 'json',
                query: {name: name},
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('rename folder successful')
                        onSuccess(data)
                    } else {
                        console.log('rename folder failed')
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('rename folder error')
                }
            })
        },
        getItemListByItemType: function ({itemType, pageParams}, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            let pageInfo = {
                page: pageParams.page,
                size: pageParams.size
            }
            NA_ajax({
                type: 'GET',
                url: URL.item + itemType + '/list',
                dataType: 'json',
                query: pageInfo,
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('Get item list by type successfully.');
                        onSuccess(data)
                    } else {
                        alert(data.message);
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('Get item list by type error')
                }
            })
        },
        copyItem: function ({itemId, destFolderId}, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            NA_ajax({
                type: 'POST',
                url: URL.item + 'copy/' + itemId + '/to/' + destFolderId,
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('copy item successful')
                        onSuccess(data)
                    } else {
                        console.log('copy item failed')
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('copy item error')
                }
            })
        },
        deleteItem: function (itemId, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            NA_ajax({
                type: 'POST',
                url: URL.item + 'delete/' + itemId,
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('delete item successful')
                        onSuccess(data)
                    } else {
                        console.log('delete item failed')
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('delete item error')
                }
            })
        },
        downloadItem: function (itemId, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            NA_ajax({
                type: 'GET',
                url: URL.item + 'download/' + itemId,
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('download item successful')
                        onSuccess(data)
                    } else {
                        console.log('download item failed')
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('download item error')
                }
            })
        },
        getItem: function ({itemId, pageParams}, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            let pageInfo = {
                page: pageParams.page,
                size: pageParams.size
            }
            NA_ajax({
                type: 'GET',
                url: URL.item + 'get/' + itemId,
                dataType: 'json',
                query: pageInfo,
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('get item successful')
                        onSuccess(data)
                    } else {
                        console.log('get item failed')
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('get item error')
                }
            })
        },
        getItemListByFolderId: function ({folderId, pageParams}, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            let pageInfo = {
                page: pageParams.page,
                size: pageParams.size
            }
            NA_ajax({
                type: 'GET',
                url: URL.item + 'in/' + folderId +'/list',
                dataType: 'json',
                query: pageInfo,
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('get item list successful')
                        onSuccess(data)
                    } else {
                        console.log('get item list failed')
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('get item list error')
                }
            })
        },
        moveItem: function ({itemId, destFolderId}, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            NA_ajax({
                type: 'POST',
                url: URL.item + 'move/' + itemId + '/to/' + destFolderId,
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('move item successful')
                        onSuccess(data)
                    } else {
                        console.log('move item failed')
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('move item error')
                }
            })
        },
        previewItem: function (itemId, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            NA_ajax({
                type: 'GET',
                url: URL.item + 'preview/' + itemId,
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('preview item successful')
                        onSuccess(data)
                    } else {
                        console.log('preview item failed')
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('preview item error')
                }
            })
        },
        renameItem: function ({itemId, name}, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            NA_ajax({
                type: 'POST',
                url: URL.item + 'rename/' + itemId,
                dataType: 'json',
                query: { name:name },
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('rename item successful')
                        onSuccess(data)
                    } else {
                        console.log('rename item failed')
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('rename item error')
                }
            })
        },
        shareItem: function (itemId, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            NA_ajax({
                type: 'GET',
                url: URL.item + 'share/' + itemId,
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('share item successful')
                        onSuccess(data)
                    } else {
                        console.log('share item failed')
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('share item error')
                }
            })
        },
        uploadCheck: function ({folderId, name, size}, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            NA_ajax({
                type: 'POST',
                url: URL.item + 'upload/check',
                dataType: 'json',
                query: {
                    folderId: folderId,
                    name: name,
                    size: size
                },
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('upload check successful')
                        onSuccess(data)
                    } else {
                        console.log('upload check failed')
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('upload check error')
                }
            })
        },
        /* uploadItem*/
        fuzzSearch: function ({keyword, pageParams}, callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            let searchInfo = {
                keyword: keyword,
                page: pageParams.page,
                size: pageParams.size
            }
            NA_ajax({
                type: 'GET',
                url: URL.search + 'fuzz',
                dataType: 'json',
                query: searchInfo,
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('fuzz search successfully.');
                        onSuccess(data)
                    } else {
                        alert(data.message);
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('fuzz search error')
                }
            })
        },
        getInfo: function (callbacks) {
            let onSuccess = callbacks.onSuccess || function () {}
            let onFailure = callbacks.onFailure || function () {}
            NA_ajax({
                type: 'GET',
                url: URL.user + 'get/info',
                dataType: 'json',
                contentType: 'application/json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', globalData.token);
                },
                success: function (data) {
                    if (data.code === CODE.success) {
                        console.log('Get info successfully.');
                        onSuccess(data)
                    } else {
                        alert(data.message);
                        onFailure(data)
                    }
                },
                error: function () {
                    console.log('Get info error')
                }
            })
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
                let onSuccess = arguments[0].onSuccess
                let onFailure = arguments[0].onFailure
                /* Method 2*/

                /* let xhr = createxmlHttpRequest();
                xhr.responseType = 'json';
                xhr.open('GET', buildURL(arguments[0].url, arguments[0].query), true);
                if(globalData.token !== '') {
                    xhr.setRequestHeader('Authorization', globalData.token);
                }
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {
                        if (xhr.status == 200) {
                            arguments[0].onSuccess
                        } else {
                            arguments[0].onFailure
                        }
                    }
                }*/
                return new Promise((resolve, reject) => {
                    /* Method 1*/
                    NA_ajax_request({
                        type: 'GET',
                        url: buildURL(ajaxData.url, ajaxData.query),
                        dataType: 'json',
                        contentType: 'application/json',
                        beforeSend: ajaxData.beforeSend,
                        success: function (data) {
                            if (data.code === ajaxData.CODE_SUCCESS) {
                                console.log('Get folder successfully.');
                                resolve(data)
                            } else {
                                alert(data.message);
                                reject(data)
                            }
                        },
                        error: function () {
                            console.log('Get folder error')
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
            ajaxData.url = buildURL(ajaxData.url, ajaxData.query)
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

    /* let NA_ajax_request = {
        get: function ({}) {
            console.log('get')
        },
        post: function () {
            console.log('post')
        },
    }*/

    function NA_ajax() {
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
        ajaxData.url = buildURL(ajaxData.url, ajaxData.query)
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
        !('ClouderWebClient' in _global) && (_global.ClouderWebClient = ClouderWebClient);
    }
}());
