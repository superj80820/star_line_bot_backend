const line = require('@line/bot-sdk');
const eventEmitter = require('events').EventEmitter;
const faceppModule = require('./../modules/facepp');
const lineEvent = new eventEmitter();
const config = require('../../config/config');

const facepp = new faceppModule(config.faceppKey, config.faceppSecret);

// create LINE SDK client
const client = new line.Client(config);

function handleEvent(event) {
    lineEvent.on('text', (event) => {
        // create a echoing text message
        const echo = { type: 'text', text: event.message.text };
        // use reply API
        client.replyMessage(event.replyToken, echo);
    })
    lineEvent.on('image', (event) => {
        let bufs = [];
        client.getMessageContent(event.message.id)
            .then((stream) => new Promise((resolve, reject) => {
                stream.on('data', (chunk) => {
                    bufs.push(chunk);
                })
                stream.on('end', () => {
                    resolve(Buffer.concat(bufs));
                })
                stream.on('error', reject);
            })
                .then((image) => {
                    return facepp.search(`&faceset_token=${config.faceppFaceSet}`, image)
                })
                .then((res) => {
                    console.log(JSON.parse(res.body))
                    client.replyMessage(
                        event.replyToken,
                        {
                            type: 'template',
                            altText: 'Confirm alt text',
                            template: {
                                type: 'confirm',
                                text: JSON.parse(res.body).image_id,
                                actions: [
                                    { label: 'Yes', type: 'message', text: 'Yes!' },
                                    { label: 'No', type: 'message', text: 'No!' },
                                ],
                            },
                        }
                    );
                })
            );
    })
    return lineEvent.emit(event.message.type, event)
}
module.exports = handleEvent