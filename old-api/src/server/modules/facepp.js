const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

class facepp {
    constructor(faceppKey, faceppSecret){
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
        return axios.post(`${this.faceHostCN}${this.faceSetGetFaceSets}${this.queryBase}`)
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log(error);
        })
    }
    /*
    ref: https://console.faceplusplus.com.cn/documents/4888395
    */
    faceSetgetDetail(query = '') {
        return axios.post(`${this.faceHostCN}${this.faceSetGetDetail}${this.queryBase}${query}`)
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log(error);
        })
    }
    /*
    ref: https://console.faceplusplus.com.cn/documents/4888393
    */
    faceSetdelete(query = '') {
        return axios.post(`${this.faceHostCN}${this.faceSetDelete}${this.queryBase}${query}`)
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log(error);
        })
    }
    /*
    ref: https://console.faceplusplus.com.cn/documents/4888401
    */
    faceSetupdate(query = '') {
        return axios.post(`${this.faceHostCN}${this.faceSetUpdate}${this.queryBase}${query}`)
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log(error);
        })
    }
    /*
    ref: https://console.faceplusplus.com.cn/documents/4888399
    */
    faceSetremoveFace(query = '') {
        return axios.post(`${this.faceHostCN}${this.faceSetRemoveFace}${this.queryBase}${query}`)
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log(error);
        })
    }
    /*
    ref: https://console.faceplusplus.com.cn/documents/4888389
    */
    faceSetaddFace(query = '') {
        return axios.post(`${this.faceHostCN}${this.faceSetAddFace}${this.queryBase}${query}`)
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log(error);
        })
    }
    /*
    ref: https://console.faceplusplus.com.cn/documents/4888391
    */
    faceSetcreate() {
        return axios.post(`${this.faceHostCN}${this.faceSetCreate}${this.queryBase}`)
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log(error);
        })
    }
    /*
    ref: https://console.faceplusplus.com.cn/documents/4888373
    Ues form-data upload image_file to get faceToken
    */
    detect(imagePath) {
        const form = new FormData();
        const image = fs.createReadStream(imagePath)
        form.append('image_file', image)
        return axios.post(`${this.faceHostCN}${this.faceDetect}${this.queryBase}`, form, {
            headers: {
                "Content-Type": `multipart/form-data; boundary=${form._boundary}`
            }
        })
        .then(res => {
            return res;
        })
        .catch(error => {
            console.log(error);
        })
    }
    /*
    ref: https://console.faceplusplus.com.cn/documents/4888381
    if use imagePath parameter: Use image_file post
    else: Use faceToken post
    */
    search(query = '', imagePath) {
        if(imagePath != undefined) {
            const form = new FormData();
            const image = fs.createReadStream(imagePath)
            form.append('image_file', image)
            return axios.post(`${this.faceHostCN}${this.faceSearch}${this.queryBase}${query}`, form, {
                headers: {
                    "Content-Type": `multipart/form-data; boundary=${form._boundary}`
                }
            })
            .then(res => {
                return res;
            })
            .catch(error => {
                console.log(error);
            })
        }
        else {
            return axios.post(`${this.faceHostCN}${this.faceSearch}${this.queryBase}${query}`)
            .then(res => {
                return res;
            })
            .catch(error => {
                console.log(error);
            })
        }
    }
}
module.exports = facepp