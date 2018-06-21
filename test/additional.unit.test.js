const expect = require('chai').expect;
const nock = require('nock');

const { getData } = require('../index');
const response = require('./mock-response');

/** These unit tests cover a range of additional tests */
describe('Additional unit tests', () => {
  beforeEach(() => {
    nock.disableNetConnect();
    nock('https://exchangeratesapi.io/api')
      .get('/2011-06-03?base=USD')
      .reply(200, response.testOne);
  });

  afterEach(() => {
    nock.enableNetConnect();
    nock.cleanAll();
  });

  it('Should detect null, undefined and existing values', () => {
    return getData('2011-06-03', 'USD', 100, 'CAD')
      .then(reshapedData => {
        expect(reshapedData).to.exist;
        expect(null).to.not.exist;
        expect(null).to.be.null;
        expect(null).to.not.be.undefined;
        expect(reshapedData.baseAmt).to.not.exist;
      });
  });

  it('Should check types', () => {
    return getData('2011-06-03', 'USD', 100, 'CAD')
      .then(reshapedData => {
        expect(reshapedData.date).to.be.a('string');
        expect(reshapedData.base_currency).to.be.a('string');
        expect(reshapedData.base_amount).to.be.a('number');
        expect(reshapedData.conversion_currency).to.be.a('string');
        expect(reshapedData.conversion_amount).to.be.a('number');
      });
  });
});
