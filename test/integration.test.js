const request = require('supertest')('https://exchangeratesapi.io/api');
const expect = require('chai').expect;
const nock = require('nock');

const { convertCurrency } = require('../index');

/**
  * This integration test makes a call to the API, checks that JSON is being returned, and then
  * checks that the rest of the program works properly with the data returned from the API.
  */

describe('Makes call to API and processes response', () => {
  beforeEach(() => {
    nock.enableNetConnect();
  });

  it('Responds with JSON and converts currency', function (done) {
    request
      .get('/2011-06-03?base=USD')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body).to.have.keys(['base', 'date', 'rates']);
        expect(typeof convertCurrency('2011-06-03', 'USD', 100, 'CAD', res.body)).to.equal('object');
        expect(convertCurrency('2011-06-03', 'USD', 100, 'CAD', res.body)).to.have.keys(['date', 'base_currency', 'base_amount', 'conversion_currency', 'conversion_amount']);
        done();
      });
  });
});
