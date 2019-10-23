const fs = require("fs");
const line = require("@line/bot-sdk");

line.downloadContent = (client, messageId, downloadPath) => {
    return client.getMessageContent(messageId).then(
        stream =>
            new Promise((resolve, reject) => {
                const writable = fs.createWriteStream(downloadPath);
                stream.pipe(writable);
                stream.on("end", () => resolve(downloadPath));
                stream.on("error", reject);
            })
    );
};
module.exports = line;
