const request = require('request-promise');
const fs = require('fs');

function imgur (accessToken) {
    this.accessToken = accessToken;
}
imgur.prototype.upload = function(imagePath, albumId){
    const image = fs.createReadStream(imagePath);
    return request({
        resolveWithFullResponse: true,
        method: 'POST',
        url: 'https://api.imgur.com/3/image',
        headers: {
            'Content-type': 'multipart/form-data;',
            Authorization: `Bearer ${this.accessToken}`,
        },
        formData: {
            image: image,
            ...albumId && {album: albumId},
        },
    })
    .then(res => {
        return Promise.resolve(res)
    })
    .catch(err => {
        return Promise.reject(err)
    })
}

module.exports = imgur
