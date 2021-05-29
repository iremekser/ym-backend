let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app.js');
var expect = chai.expect;
chai.should();
chai.use(chaiHttp);

describe('Task APIs', () => {
  it('GET All Media Organ Types', () => {
    chai
      .request(server)
      .get('/v1.0/media-organ-types')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhZmV0MTk5OEBnbWFpbC5jb20iLCJwb2xsc3RlcklkIjoiNjBhNmE5YzZhOTdiMjcxNTc0OTlmZDU3IiwidHlwZSI6InBvbGxzdGVyIiwiaWF0IjoxNjIxNzkzNDkzLCJleHAiOjE2NTMzNTEwOTN9.zyOfFtEUL71Kd4gFOkmlW7pPQsSBs1YPG_gUelr6Unc'
      )
      .end((error, res) => {
        expect(res).to.have.status(200);
      });
  });
  it('GET All Customers', () => {
    chai
      .request(server)
      .get('/v1.0/customers')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhZmV0MTk5OEBnbWFpbC5jb20iLCJwb2xsc3RlcklkIjoiNjBhNmE5YzZhOTdiMjcxNTc0OTlmZDU3IiwidHlwZSI6InBvbGxzdGVyIiwiaWF0IjoxNjIxNzkzNDkzLCJleHAiOjE2NTMzNTEwOTN9.zyOfFtEUL71Kd4gFOkmlW7pPQsSBs1YPG_gUelr6Unc'
      )
      .end((error, res) => {
        expect(res)
          .body.should.have.property('data')
          .that.includes.all.keys([
            '_id',
            'mediaOrgans',
            'reportingTypeId',
            'customerType',
            'username'
          ]);
      });
  });
  it('GET All Pollsters', () => {
    chai
      .request(server)
      .get('/v1.0/pollsters')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhZmV0MTk5OEBnbWFpbC5jb20iLCJwb2xsc3RlcklkIjoiNjBhNmE5YzZhOTdiMjcxNTc0OTlmZDU3IiwidHlwZSI6InBvbGxzdGVyIiwiaWF0IjoxNjIxNzkzNDkzLCJleHAiOjE2NTMzNTEwOTN9.zyOfFtEUL71Kd4gFOkmlW7pPQsSBs1YPG_gUelr6Unc'
      )
      .end((error, res) => {
        expect(res)
          .body.should.have.property('data')
          .that.includes.all.keys(['_id', 'name', 'email', 'password']);
      });
  });
  it('GET Single Customers', () => {
    chai
      .request(server)
      .get('/v1.0/customers/609eda5ccf4b364df0178238')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhZmV0MTk5OEBnbWFpbC5jb20iLCJwb2xsc3RlcklkIjoiNjBhNmE5YzZhOTdiMjcxNTc0OTlmZDU3IiwidHlwZSI6InBvbGxzdGVyIiwiaWF0IjoxNjIxNzkzNDkzLCJleHAiOjE2NTMzNTEwOTN9.zyOfFtEUL71Kd4gFOkmlW7pPQsSBs1YPG_gUelr6Unc'
      )
      .end((error, res) => {
        expect(res.body.email).to.equals('iremirem@ok.com');
      });
  });

  it('GET All Medias', () => {
    chai
      .request(server)
      .get('/v1.0/medias')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhZmV0MTk5OEBnbWFpbC5jb20iLCJwb2xsc3RlcklkIjoiNjBhNmE5YzZhOTdiMjcxNTc0OTlmZDU3IiwidHlwZSI6InBvbGxzdGVyIiwiaWF0IjoxNjIxNzkzNDkzLCJleHAiOjE2NTMzNTEwOTN9.zyOfFtEUL71Kd4gFOkmlW7pPQsSBs1YPG_gUelr6Unc'
      )
      .end((error, res) => {
        expect(res).to.be.json;
      });
  });
  it('GET Single Media Organs', () => {
    chai
      .request(server)
      .get('/v1.0/media-organs/60a12684ec7cfd09a49867bd')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhZmV0MTk5OEBnbWFpbC5jb20iLCJwb2xsc3RlcklkIjoiNjBhNmE5YzZhOTdiMjcxNTc0OTlmZDU3IiwidHlwZSI6InBvbGxzdGVyIiwiaWF0IjoxNjIxNzkzNDkzLCJleHAiOjE2NTMzNTEwOTN9.zyOfFtEUL71Kd4gFOkmlW7pPQsSBs1YPG_gUelr6Unc'
      )
      .end((error, res) => {
        expect(res.body.name).to.equals('NTV');
      });
  });
  it('POST Login', () => {
    chai
      .request(server)
      .post('/v1.0/auth/login')
      .send({ email: 'rafet1998@gmail.com', password: '123456' })
      .end((error, res) => {
        expect(res).to.have.status(200);
      });
  });
  it('POST Media Organ Type', () => {
    chai
      .request(server)
      .post('/v1.0/media-organ-types')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhZmV0MTk5OEBnbWFpbC5jb20iLCJwb2xsc3RlcklkIjoiNjBhNmE5YzZhOTdiMjcxNTc0OTlmZDU3IiwidHlwZSI6InBvbGxzdGVyIiwiaWF0IjoxNjIxNzkzNDkzLCJleHAiOjE2NTMzNTEwOTN9.zyOfFtEUL71Kd4gFOkmlW7pPQsSBs1YPG_gUelr6Unc'
      )
      .send({ title: 'TEST!' })
      .end((error, res) => {
        expect(res).to.have.status(200);
      });
  });
  it('GET Single Survey Answer', () => {
    chai
      .request(server)
      .get('/v1.0/survey-answers/60a6c95da0d1354a90d40150')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhZmV0MTk5OEBnbWFpbC5jb20iLCJwb2xsc3RlcklkIjoiNjBhNmE5YzZhOTdiMjcxNTc0OTlmZDU3IiwidHlwZSI6InBvbGxzdGVyIiwiaWF0IjoxNjIxNzkzNDkzLCJleHAiOjE2NTMzNTEwOTN9.zyOfFtEUL71Kd4gFOkmlW7pPQsSBs1YPG_gUelr6Unc'
      )
      .end((error, res) => {
        expect(res.body.questions).to.be.an.array;
      });
  });
  it('GET All Surveys', () => {
    chai
      .request(server)
      .get('/v1.0/surveys')
      .set(
        'Authorization',
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJhZmV0MTk5OEBnbWFpbC5jb20iLCJwb2xsc3RlcklkIjoiNjBhNmE5YzZhOTdiMjcxNTc0OTlmZDU3IiwidHlwZSI6InBvbGxzdGVyIiwiaWF0IjoxNjIxNzkzNDkzLCJleHAiOjE2NTMzNTEwOTN9.zyOfFtEUL71Kd4gFOkmlW7pPQsSBs1YPG_gUelr6Unc'
      )
      .end((error, res) => {
        expect(res).to.be.json;
      });
  });
});
