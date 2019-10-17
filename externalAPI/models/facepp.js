const request = require('request-promise');
const fs = require('fs');

function facepp (faceppKey, faceppSecret) {
    this.faceppKey = faceppKey;
    this.faceppSecret = faceppSecret;
}
facepp.prototype.detect = function(imagePath){
    const image = fs.createReadStream(imagePath);
    return request({
        resolveWithFullResponse: true,
        method: 'POST',
        url: 'https://api-cn.faceplusplus.com/facepp/v3/detect',
        headers: {
            'Content-type': 'multipart/form-data'
        },
        qs: {
            api_key: this.faceppKey,
            api_secret: this.faceppSecret,
        },
        formData: {
            image_file: image,
        },
    })
    .then(res => {
        return Promise.resolve(res)
    })
    .catch(err => {
        return Promise.reject(err)
    })
}
facepp.prototype.addFace = function(faceSetToken, ...faceTokens){
    return request({
        resolveWithFullResponse: true,
        method: 'POST',
        url: 'https://api-cn.faceplusplus.com/facepp/v3/faceset/addface',
        headers: {
            'Content-type': 'application/json'
        },
        qs: {
            api_key: this.faceppKey,
            api_secret: this.faceppSecret,
            faceset_token: faceSetToken,
            face_tokens: (faceTokens.length > 1) ? faceTokens.join(',') : faceTokens[0],
        },
    })
    .then(res => {
        return Promise.resolve(res)
    })
    .catch(err => {
        return Promise.reject(err)
    })
}

module.exports = facepp
