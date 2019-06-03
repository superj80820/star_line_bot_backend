const fs = require('fs');
const rp = require('request-promise');

class facepp {
    constructor(faceppKey, faceppSecret) {
        this.faceppKey = faceppKey;
        this.faceppSecret = faceppSecret;
        this.queryBase = `?api_key=${this.faceppKey}&api_secret=${this.faceppSecret}`
        this.faceHostCN = "https://api-cn.faceplusplus.com/";
        this.faceHostUS = "https://api-us.faceplusplus.com/";

        this.faceApiVersion = "facepp/v3/";
        this.faceDetect = this.faceApiVersion + "detect";
        this.faceCompare = this.faceApiVersion + "compare";
        this.faceSearch = this.faceApiVersion + "search";

        // facetoken
        this.faceToken = this.faceApiVersion + "face/";
        this.faceTokenAnalyze = this.faceToken + "analyze";
        this.faceTokenSetUsedir = this.faceToken + "setuserid";
        this.faceTokenGetDetail = this.faceToken + "getdetail";

        //faceSet
        this.faceSet = this.faceApiVersion + "faceset/";
        this.faceSetCreate = this.faceSet + "create";
        this.faceSetAddFace = this.faceSet + "addface";
        this.faceSetRemoveFace = this.faceSet + "removeface";
        this.faceSetUpdate = this.faceSet + "update";
        this.faceSetGetDetail = this.faceSet + "getdetail";
        this.faceSetGetFaceSets = this.faceSet + "getfacesets";
        this.faceSetDelete = this.faceSet + "delete";
    }
    /*
    ref: https://console.faceplusplus.com.cn/documents/4888397
    */
    faceSetgetFaceSets() {
        return rp(
            {
                uri: `${this.faceHostCN}${this.faceSetGetFaceSets}${this.queryBase}`,
                method: 'POST',
                resolveWithFullResponse: true
            })
            .then(function (res) {
                return res
            })
            .catch(function (err) {
                console.log(err)
            });
    }
    /*
    ref: https://console.faceplusplus.com.cn/documents/4888395
    */
    faceSetgetDetail(query = '') {
        return rp(
            {
                uri: `${this.faceHostCN}${this.faceSetGetDetail}${this.queryBase}${query}`,
                method: 'POST',
                resolveWithFullResponse: true
            })
            .then(function (res) {
                return res
            })
            .catch(function (err) {
                console.log(err)
            });
    }
    /*
    ref: https://console.faceplusplus.com.cn/documents/4888393
    */
    faceSetdelete(query = '') {
        return rp(
            {
                uri: `${this.faceHostCN}${this.faceSetDelete}${this.queryBase}${query}`,
                method: 'POST',
                resolveWithFullResponse: true
            })
            .then(function (res) {
                return res
            })
            .catch(function (err) {
                console.log(err)
            });
    }
    /*
    ref: https://console.faceplusplus.com.cn/documents/4888401
    */
    faceSetupdate(query = '') {
        return rp(
            {
                uri: `${this.faceHostCN}${this.faceSetUpdate}${this.queryBase}${query}`,
                method: 'POST',
                resolveWithFullResponse: true
            })
            .then(function (res) {
                return res
            })
            .catch(function (err) {
                console.log(err)
            });
    }
    /*
    ref: https://console.faceplusplus.com.cn/documents/4888399
    */
    faceSetremoveFace(query = '') {
        return rp(
            {
                uri: `${this.faceHostCN}${this.faceSetRemoveFace}${this.queryBase}${query}`,
                method: 'POST',
                resolveWithFullResponse: true
            })
            .then(function (res) {
                return res
            })
            .catch(function (err) {
                console.log(err)
            });
    }
    /*
    ref: https://console.faceplusplus.com.cn/documents/4888389
    */
    faceSetaddFace(query = '') {
        return rp(
            {
                uri: `${this.faceHostCN}${this.faceSetAddFace}${this.queryBase}${query}`,
                method: 'POST',
                resolveWithFullResponse: true
            })
            .then(function (res) {
                return res
            })
            .catch(function (err) {
                console.log(err)
            });
    }
    /*
    ref: https://console.faceplusplus.com.cn/documents/4888391
    */
    faceSetcreate() {
        return rp(
            {
                uri: `${this.faceHostCN}${this.faceSetCreate}${this.queryBase}`,
                method: 'POST',
                resolveWithFullResponse: true
            })
            .then(function (res) {
                return res
            })
            .catch(function (err) {
                console.log(err)
            });
    }
    /*
    ref: https://console.faceplusplus.com.cn/documents/4888373
    Ues form-data upload image_file to get faceToken
    */
    detect(image) {
        if (typeof image === 'string' || image instanceof String) {
            return rp(
                {
                    uri: `${this.faceHostCN}${this.faceDetect}${this.queryBase}`,
                    formData: {
                        image_file: {
                            value: fs.createReadStream(image),
                            options: {
                                filename: image
                            }
                        }
                    },
                    headers: {
                        'content-type': 'multipart/form-data; boundary=---WebKitFormBoundary7MA4YWxkTrZu0gW'
                    },
                    method: 'POST',
                    resolveWithFullResponse: true
                })
                .then(function (res) {
                    return res
                })
                .catch(function (err) {
                    console.log(err)
                });
        }
        else if (image instanceof Buffer) {
            return rp(
                {
                    uri: `${this.faceHostCN}${this.faceDetect}${this.queryBase}`,
                    formData: {
                        image_file: {
                            value: image,
                            options: {
                                filename: 'image_file'
                            }
                        }
                    },
                    method: 'POST',
                    resolveWithFullResponse: true
                })
                .then(function (res) {
                    return res
                })
                .catch(function (err) {
                    console.log(err)
                });
        }
    }
    /*
    ref: https://console.faceplusplus.com.cn/documents/4888381
    if use imagePath parameter: Use image_file post
    else: Use faceToken post
    */
    search(query = '', image) {
        if (typeof image === 'string' || image instanceof String) {
            return rp(
                {
                    uri: `${this.faceHostCN}${this.faceSearch}${this.queryBase}${query}`,
                    formData: {
                        image_file: {
                            value: fs.createReadStream(image),
                            options: {
                                filename: image
                            }
                        }
                    },
                    headers: {
                        'content-type': 'multipart/form-data; boundary=---WebKitFormBoundary7MA4YWxkTrZu0gW'
                    },
                    method: 'POST',
                    resolveWithFullResponse: true
                })
                .then(function (res) {
                    return res
                })
                .catch(function (err) {
                    console.log(err)
                });
        }
        else if (image instanceof Buffer) {
            return rp(
                {
                    uri: `${this.faceHostCN}${this.faceSearch}${this.queryBase}${query}`,
                    formData: {
                        image_file: {
                            value: image,
                            options: {
                                filename: 'image_file'
                            }
                        }
                    },
                    method: 'POST',
                    resolveWithFullResponse: true
                })
                .then(function (res) {
                    return res
                })
                .catch(function (err) {
                    console.log(err)
                });
        }
        else {
            return rp(
                {
                    uri: `${this.faceHostCN}${this.faceSearch}${this.queryBase}${query}`,
                    method: 'POST',
                    resolveWithFullResponse: true
                })
                .then(function (res) {
                    return res
                })
                .catch(function (err) {
                    console.log(err)
                });
        }
    }
}
module.exports = facepp