const config = require('./../../config/config');
const faceppModule = require('../modules/facepp');

class faceppController {
    constructor() {
        this.facepp = new faceppModule(config.faceppKey, config.faceppSecret);
    }
    async getFaceSetsList(_, res, next) {
        try {
            
            const faceppRes = await this.facepp.faceSetgetFaceSets();
            res.json(JSON.parse(faceppRes.body));
        } catch (e) {
            next(e);
        }
    }
    async searchFaceInFaceSets(req, res, next) {
        try {
            const faceppRes = await this.facepp.search(`&faceset_token=${req.body.token}`, req.file.buffer);
            res.json(JSON.parse(faceppRes.body));
        } catch (e) {
            next(e);
        }
    }
}
module.exports = faceppController

