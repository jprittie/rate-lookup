const request = require('supertest')('https://exchangeratesapi.io/api');

const expect = require('chai').expect;
const nock = require('nock');

describe('Makes call to API', () => {
  beforeEach(() => {
    nock.enableNetConnect();
  });

  it('Responds with JSON', function (done) {
    request
      .get('/2014-01-01')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});
