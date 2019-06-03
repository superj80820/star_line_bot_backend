const expect = require('chai').expect;
const faceppModule = require('../../src/server/modules/facepp');
const config = require('../../src/config/config');
const fs = require('fs');

facepp = new faceppModule(config.faceppKey, config.faceppSecret);

describe('FacePlusPlus api test begin', function(){
  this.timeout(15000);
  beforeEach(function (done) {
    setTimeout(function(){
      done();
    }, 1000);
  });
  it('faceSetgetGaceSets tset', async () => {
    //Test case
    res = await facepp.faceSetgetFaceSets();
    expect(res.statusCode).to.equal(200)
    expect(JSON.parse(res.body)).to.be.an('object');
  });
  it('faceSetgetDetail tset', async () => {
    //Setup
    res = await facepp.faceSetcreate();
    //Test case
    res = await facepp.faceSetgetDetail(`&faceset_token=${JSON.parse(res.body).faceset_token}`);
    expect(res.statusCode).to.equal(200)
    expect(JSON.parse(res.body)).to.be.an('object');
  });
  it('faceSetdelete tset', async () => {
    //Setup
    res = await facepp.faceSetcreate();
    //Test case
    res = await facepp.faceSetdelete(`&faceset_token=${JSON.parse(res.body).faceset_token}&tags=hello`);
    expect(res.statusCode).to.equal(200);
    expect(JSON.parse(res.body)).to.be.an('object');
  });
  it('faceSetupdate tset', async () => {
    //Setup
    res = await facepp.faceSetcreate();
    //Test case
    res = await facepp.faceSetupdate(`&faceset_token=${JSON.parse(res.body).faceset_token}&tags=hello`);
    expect(res.statusCode).to.equal(200)
    expect(JSON.parse(res.body)).to.be.an('object');
    res = await facepp.faceSetgetDetail(`&faceset_token=${JSON.parse(res.body).faceset_token}`);
    expect(JSON.parse(res.body).tags).to.equal('hello')
    //Teardown
    await facepp.faceSetdelete(`&faceset_token=${JSON.parse(res.body).faceset_token}`);
  });
  it('faceSetremoveFace tset', async () => {
    //Setup
    res = await facepp.faceSetcreate();
    const faceSetToken = JSON.parse(res.body).faceset_token
    res = await facepp.detect('./test/res/test.png');
    const faceToken = JSON.parse(res.body).faces[0].face_token
    res = await facepp.faceSetaddFace(`&faceset_token=${faceSetToken}&face_tokens=${faceToken}`);
    //Test case
    res = await facepp.faceSetremoveFace(`&faceset_token=${faceSetToken}&face_tokens=${faceToken}`);
    expect(res.statusCode).to.equal(200)
    expect(JSON.parse(res.body)).to.be.an('object');
    //Teardown
    await facepp.faceSetdelete(`&faceset_token=${faceSetToken}`);
  });
  it('faceSetaddFace tset', async () => {
    //Setup
    res = await facepp.faceSetcreate();
    const faceSetToken = JSON.parse(res.body).faceset_token
    res = await facepp.detect('./test/res/test.png');
    const faceToken = JSON.parse(res.body).faces[0].face_token
    //Test case
    res = await facepp.faceSetaddFace(`&faceset_token=${faceSetToken}&face_tokens=${faceToken}`);
    expect(res.statusCode).to.equal(200)
    expect(JSON.parse(res.body)).to.be.an('object');
    //Teardown
    await facepp.faceSetremoveFace(`&faceset_token=${faceSetToken}&face_tokens=${faceToken}`);
    await facepp.faceSetdelete(`&faceset_token=${faceSetToken}`);
  });
  it('faceSetcreate tset', async () => {
    //Test case
    res = await facepp.faceSetcreate();
    expect(res.statusCode).to.equal(200)
    expect(JSON.parse(res.body)).to.be.an('object');
    //Teardown
    await facepp.faceSetdelete(`&faceset_token=${JSON.parse(res.body).faceset_token}`);
  });
  it('detect buffer tset', async () => {
    //Setup
    const image = fs.readFileSync('./test/res/search.png');
    //Test case
    res = await facepp.detect(image);
    expect(res.statusCode).to.equal(200)
    expect(JSON.parse(res.body)).to.be.an('object');
  });
  it('detect image_file tset', async () => {
    //Test case
    res = await facepp.detect('./test/res/test.png');
    expect(res.statusCode).to.equal(200)
    expect(JSON.parse(res.body)).to.be.an('object');
  });
  it('search use buffer tset', async () => {
    //Setup
    res = await facepp.faceSetcreate();
    const faceSetToken = JSON.parse(res.body).faceset_token
    res = await facepp.detect('./test/res/test.png');
    const faceToken = JSON.parse(res.body).faces[0].face_token
    res = await facepp.faceSetaddFace(`&faceset_token=${faceSetToken}&face_tokens=${faceToken}`);
    const image = fs.readFileSync('./test/res/search.png');
    //Test case
    res = await facepp.search(`&faceset_token=${faceSetToken}`, image);
    expect(res.statusCode).to.equal(200)
    expect(JSON.parse(res.body)).to.be.an('object');
    //Teardown
    await facepp.faceSetremoveFace(`&faceset_token=${faceSetToken}&face_tokens=${faceToken}`);
    await facepp.faceSetdelete(`&faceset_token=${faceSetToken}`);
  });
  it('search use face_token tset', async () => {
    //Setup
    res = await facepp.faceSetcreate();
    const faceSetToken = JSON.parse(res.body).faceset_token
    res = await facepp.detect('./test/res/test.png');
    const faceToken = JSON.parse(res.body).faces[0].face_token
    res = await facepp.faceSetaddFace(`&faceset_token=${faceSetToken}&face_tokens=${faceToken}`);
    res = await facepp.detect('./test/res/search.png');
    const faceTokenSearch = JSON.parse(res.body).faces[0].face_token
    //Test case
    res = await facepp.search(`&faceset_token=${faceSetToken}&face_token=${faceTokenSearch}`);
    expect(res.statusCode).to.equal(200)
    expect(JSON.parse(res.body)).to.be.an('object');
    //Teardown
    await facepp.faceSetremoveFace(`&faceset_token=${faceSetToken}&face_tokens=${faceToken},${faceTokenSearch}`);
    await facepp.faceSetdelete(`&faceset_token=${faceSetToken}`);
  });
  it('search use image_file tset', async () => {
    //Setup
    res = await facepp.faceSetcreate();
    const faceSetToken = JSON.parse(res.body).faceset_token
    res = await facepp.detect('./test/res/test.png');
    const faceToken = JSON.parse(res.body).faces[0].face_token
    res = await facepp.faceSetaddFace(`&faceset_token=${faceSetToken}&face_tokens=${faceToken}`);
    //Test case
    res = await facepp.search(`&faceset_token=${faceSetToken}`, './test/res/search.png');
    expect(res.statusCode).to.equal(200)
    expect(JSON.parse(res.body)).to.be.an('object');
    //Teardown
    await facepp.faceSetremoveFace(`&faceset_token=${faceSetToken}&face_tokens=${faceToken}`);
    await facepp.faceSetdelete(`&faceset_token=${faceSetToken}`);
  });
});