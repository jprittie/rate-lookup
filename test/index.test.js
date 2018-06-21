const expect = require('chai').expect;
const nock = require('nock');

const getData = require('../index').getData;
// destructure
const response = require('./response');

describe('Gets exchange rate data for 2011-06-03', () => {
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

  it('Calculates conversion and returns reshaped data object', () => {
    return getData('2011-06-03', 'USD', 100, 'CAD')
      .then(reshapedData => {
        console.log('reshapedData', reshapedData);
        expect(typeof reshapedData).to.equal('object');
        expect(reshapedData.date).to.equal('2011-06-03');
        expect(reshapedData.base_currency).to.equal('USD');
        expect(reshapedData.base_amount).to.equal(100);
        expect(reshapedData.conversion_currency).to.equal('CAD');
        expect(reshapedData.conversion_amount).to.equal(97.85);
      });
  });
});

describe('Gets exchange rate data for 2007-07-12', () => {
  beforeEach(() => {
    nock.disableNetConnect();
    nock('https://exchangeratesapi.io/api')
      .get('/2007-07-12?base=GBP')
      .reply(200, response.testTwo);
  });

  afterEach(() => {
    nock.enableNetConnect();
    nock.cleanAll();
  });

  it('Calculates conversion and returns reshaped data object', () => {
    return getData('2007-07-12', 'GBP', 303, 'SEK')
      .then(reshapedData => {
        console.log('reshapedData', reshapedData);
        expect(typeof reshapedData).to.equal('object');
        expect(reshapedData.date).to.equal('2007-07-12');
        expect(reshapedData.base_currency).to.equal('GBP');
        expect(reshapedData.base_amount).to.equal(303);
        expect(reshapedData.conversion_currency).to.equal('SEK');
        expect(reshapedData.conversion_amount).to.not.equal(4085.0157);
      });
  });
});

describe('Gets exchange rate data for 2004-08-07', () => {
  beforeEach(() => {
    nock.disableNetConnect();
    nock('https://exchangeratesapi.io/api')
      .get('/2004-08-07?base=EUR')
      .reply(200, response.testThree);
  });

  afterEach(() => {
    nock.enableNetConnect();
    nock.cleanAll();
  });

  it('Calculates conversion and returns reshaped data object', () => {
    return getData('2004-08-07', 'EUR', 5, 'PLN')
      .then(reshapedData => {
        console.log('reshapedData', reshapedData);
        expect(typeof reshapedData).to.equal('object');
        expect(reshapedData.date).to.equal('2004-08-07');
        expect(reshapedData.base_currency).to.equal('EUR');
        expect(reshapedData.base_amount).to.equal(5);
        expect(reshapedData.conversion_currency).to.equal('PLN');
        expect(reshapedData.conversion_amount).to.equal(22.01);
      });
  });
});

describe('Gets exchange rate data for 2017-02-09', () => {
  beforeEach(() => {
    nock.disableNetConnect();
    nock('https://exchangeratesapi.io/api')
      .get('/2017-02-09?base=ZAR')
      .reply(200, response.testFour);
  });

  afterEach(() => {
    nock.enableNetConnect();
    nock.cleanAll();
  });

  it('Calculates conversion and returns reshaped data object', () => {
    return getData('2017-02-09', 'ZAR', 132, 'TRY')
      .then(reshapedData => {
        console.log('reshapedData', reshapedData);
        expect(typeof reshapedData).to.equal('object');
        expect(reshapedData.date).to.equal('2017-02-09');
        expect(reshapedData.base_currency).to.equal('ZAR');
        expect(reshapedData.base_amount).to.equal(132);
        expect(reshapedData.conversion_currency).to.equal('TRY');
        expect(reshapedData.conversion_amount).to.not.equal(36.3528);
      });
  });
});
