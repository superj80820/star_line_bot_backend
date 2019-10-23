const config = require("../config");
const path = require("path");
const line = require("../externalAPI/models/line");
const facepp = require("../externalAPI/models/facepp");
const faceFace = require("../db/models").faceFace;
const faceInfo = require("../db/models").faceInfo;

faceppObj = new facepp(
    config.facepp.faceppKey,
    config.facepp.faceppSecret,
    config.facepp.faceppFaceset
);

const lineConfig = {
    channelAccessToken: config.line.lineChannelAccessToken,
    channelSecret: config.line.lineChannelSecret
};
const client = new line.Client(lineConfig);

module.exports = {
    handleText(message, replyToken, source) {
        const echo = { type: "text", text: message.text };
        return client.replyMessage(replyToken, echo);
    },
    handleImage(message, replyToken) {
        let getContent;
        const savePath = "../other/temp/line";
        if (message.contentProvider.type === "line") {
            const downloadPath = path.join(
                __dirname,
                `${savePath}`,
                `${message.id}.jpg`
            );
            getContent = line
                .downloadContent(client, message.id, downloadPath)
                .then(downloadPath => {
                    return faceppObj.search(downloadPath);
                })
                .then(data => {
                    faceSearchData = JSON.parse(data.body);
                    return faceFace.findAll({
                        where: {
                            token: faceSearchData.results[0].face_token
                        },
                        raw: true
                    });
                })
                .then(faces => {
                    if (faces.length === 0) {
                        return Promise.reject("Not found");
                    }
                    return faceInfo.findAll({
                        where: {
                            id: faces[0].infoId
                        },
                        raw: true
                    });
                })
                .then(info => {
                    if (info.length === 0) {
                        return Promise.reject("Not found");
                    }
                    return Promise.resolve(info);
                })
                .catch(error => {
                    console.error(error)
                });
        } else if (message.contentProvider.type === "external") {
            getContent = Promise.resolve(message.contentProvider);
        }
        return getContent.then(info => {
            console.log(info[0].name);
            const echo = { type: "text", text: `找到了 ${info[0].name}` };
            return client.replyMessage(replyToken, echo);
        });
    }
};
