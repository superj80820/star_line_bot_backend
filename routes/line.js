const router = require("express").Router();
const config = require("../config");
const { middleware } = require("@line/bot-sdk");
const lineController = require("../controllers/line");

const lineConfig = {
    channelAccessToken: config.line.lineChannelAccessToken,
    channelSecret: config.line.lineChannelSecret
};

router.post("/", middleware(lineConfig), (req, res) => {
    Promise.all(
        req.body.events.map(event => {
            switch (event.type) {
                case "message":
                    const message = event.message;
                    switch (message.type) {
                        case "text":
                            return lineController.handleText(message, event.replyToken, event.source);
                        case "image":
                            return lineController.handleImage(message, event.replyToken);
                        default:
                            throw new Error(
                                `Unknown message: ${JSON.stringify(message)}`
                            );
                    }
            }
        })
    )
        .then(() => res.end())
        .catch(err => {
            console.error(err);
            res.status(500).end();
        });
});

module.exports = router;
