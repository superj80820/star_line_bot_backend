/* express.js */
import express from 'express';
import config from './config';
import index from '../server/routes/index.route';
const line = require('@line/bot-sdk');
const event_emitter = require('events').EventEmitter;
const line_event = new event_emitter();

// create LINE SDK client
const client = new line.Client(config);

const app = express();

/* GET home page. */
app.get('/', (req, res) => { //Main screen displayed on the web page
    // res.send(`Hi suzumiya! server started on  port http://127.0.0.1:${config.port} (${config.env})`); //Original content, perhaps for reference later, so stay first
    res.send(`Hello world`); //"hello world" display on home page
});

app.use('/api', index);

app.post('/callback', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result))
        .catch((err) => {
            console.error(err);
            res.status(500).end();
        });
});

// event handler
function handleEvent(event) {
    line_event.on('message', (event) => {
        // create a echoing text message
        const echo = { type: 'text', text: event.message.text };

        // use reply API
        client.replyMessage(event.replyToken, echo);
    })
    return line_event.emit(event.type, event)
}

export default app;
