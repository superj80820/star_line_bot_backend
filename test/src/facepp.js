const expect = require('chai').expect;
const faceppModule = require('../../src/server/modules/facepp');
const config = require('../../src/config/config');

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
    expect(res.status).to.equal(200)
    expect(res.data).to.be.an('object');
  });
  it('faceSetgetDetail tset', async () => {
    //Setup
    res = await facepp.faceSetcreate();
    //Test case
    res = await facepp.faceSetgetDetail(`&faceset_token=${res.data.faceset_token}`);
    expect(res.status).to.equal(200)
    expect(res.data).to.be.an('object');
  });
  it('faceSetdelete tset', async () => {
    //Setup
    res = await facepp.faceSetcreate();
    //Test case
    res = await facepp.faceSetdelete(`&faceset_token=${res.data.faceset_token}&tags=hello`);
    expect(res.status).to.equal(200);
    expect(res.data).to.be.an('object');
  });
  it('faceSetupdate tset', async () => {
    //Setup
    res = await facepp.faceSetcreate();
    //Test case
    res = await facepp.faceSetupdate(`&faceset_token=${res.data.faceset_token}&tags=hello`);
    expect(res.status).to.equal(200)
    expect(res.data).to.be.an('object');
    res = await facepp.faceSetgetDetail(`&faceset_token=${res.data.faceset_token}`);
    expect(res.data.tags).to.equal('hello')
    //Teardown
    await facepp.faceSetdelete(`&faceset_token=${res.data.faceset_token}`);
  });
  it('faceSetremoveFace tset', async () => {
    //Setup
    res = await facepp.faceSetcreate();
    const faceSetToken = res.data.faceset_token
    res = await facepp.detect('./test/res/test.png');
    const faceToken = res.data.faces[0].face_token
    res = await facepp.faceSetaddFace(`&faceset_token=${faceSetToken}&face_tokens=${faceToken}`);
    //Test case
    res = await facepp.faceSetremoveFace(`&faceset_token=${faceSetToken}&face_tokens=${faceToken}`);
    expect(res.status).to.equal(200)
    expect(res.data).to.be.an('object');
    //Teardown
    await facepp.faceSetdelete(`&faceset_token=${faceSetToken}`);
  });
  it('faceSetaddFace tset', async () => {
    //Setup
    res = await facepp.faceSetcreate();
    const faceSetToken = res.data.faceset_token
    res = await facepp.detect('./test/res/test.png');
    const faceToken = res.data.faces[0].face_token
    //Test case
    res = await facepp.faceSetaddFace(`&faceset_token=${faceSetToken}&face_tokens=${faceToken}`);
    expect(res.status).to.equal(200)
    expect(res.data).to.be.an('object');
    //Teardown
    await facepp.faceSetremoveFace(`&faceset_token=${faceSetToken}&face_tokens=${faceToken}`);
    await facepp.faceSetdelete(`&faceset_token=${faceSetToken}`);
  });
  it('faceSetcreate tset', async () => {
    //Test case
    res = await facepp.faceSetcreate();
    expect(res.status).to.equal(200)
    expect(res.data).to.be.an('object');
    //Teardown
    await facepp.faceSetdelete(`&faceset_token=${res.data.faceset_token}`);
  });
  it('detect tset', async () => {
    //Test case
    res = await facepp.detect('./test/res/test.png');
    expect(res.status).to.equal(200)
    expect(res.data).to.be.an('object');
  });
  it('search use face_token tset', async () => {
    //Setup
    res = await facepp.faceSetcreate();
    const faceSetToken = res.data.faceset_token
    res = await facepp.detect('./test/res/test.png');
    const faceToken = res.data.faces[0].face_token
    res = await facepp.faceSetaddFace(`&faceset_token=${faceSetToken}&face_tokens=${faceToken}`);
    res = await facepp.detect('./test/res/search.png');
    const faceTokenSearch = res.data.faces[0].face_token
    //Test case
    res = await facepp.search(`&faceset_token=${faceSetToken}&face_token=${faceTokenSearch}`);
    expect(res.status).to.equal(200)
    expect(res.data).to.be.an('object');
    //Teardown
    await facepp.faceSetremoveFace(`&faceset_token=${faceSetToken}&face_tokens=${faceToken},${faceTokenSearch}`);
    await facepp.faceSetdelete(`&faceset_token=${faceSetToken}`);
  });
  it('search use image_file tset', async () => {
    //Setup
    res = await facepp.faceSetcreate();
    const faceSetToken = res.data.faceset_token
    res = await facepp.detect('./test/res/test.png');
    const faceToken = res.data.faces[0].face_token
    res = await facepp.faceSetaddFace(`&faceset_token=${faceSetToken}&face_tokens=${faceToken}`);
    //Test case
    res = await facepp.search(`&faceset_token=${faceSetToken}`, './test/res/search.png');
    expect(res.status).to.equal(200)
    expect(res.data).to.be.an('object');
    //Teardown
    await facepp.faceSetremoveFace(`&faceset_token=${faceSetToken}&face_tokens=${faceToken}`);
    await facepp.faceSetdelete(`&faceset_token=${faceSetToken}`);
  });
});