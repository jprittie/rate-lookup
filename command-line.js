const moment = require('moment');
moment().format();

const currencyOptions = [
  'AUD', 'CAD', 'CHF', 'CYP', 'CZK', 'DKK', 'EEK', 'GBP', 'HKD', 'HUF', 'ISK', 'JPY', 'KRW', 'LTL', 'LVL', 'MTL', 'NOK', 'NZD', 'PLN', 'ROL', 'SEK', 'SGD', 'SIT', 'SKK', 'TRL', 'USD', 'ZAR'
];

const questions = [
  {
    name: 'date',
    type: 'input',
    message: 'Enter an exchange rate date in YYYY-MM-DD format (after 1999-01-04):',
    validate: function (value) {
      if (value.length && checkDate(value)) {
        return true;
      } else {
        return 'Please enter the exchange rate date.';
      }
    }
  },
  {
    name: 'baseAmt',
    type: 'input',
    message: 'Enter the base amount to convert:',
    validate: function (value) {
      const convertedValue = parseFloat(value);
      if (convertedValue && !(isNaN(convertedValue)) && typeof convertedValue === 'number') {
        return true;
      } else {
        return 'Please enter the base amount to convert:';
      }
    }
  },
  {
    name: 'baseCurr',
    type: 'input',
    message: 'Please enter the three-letter base currency (i.e. USD):',
    validate: function (value) {
      if (value.length === 3 && typeof value === 'string' && currencyOptions.includes(value)) {
        return true;
      } else {
        return 'Please enter the base currency:';
      }
    }
  },
  {
    name: 'convCurr',
    type: 'input',
    message: 'Please enter the three-letter currency to convert to (i.e. CAD):',
    validate: function (value) {
      if (value.length === 3 && typeof value === 'string' && currencyOptions.includes(value)) {
        return true;
      } else {
        return 'Please enter the currency to convert to:';
      }
    }
  }
];

function checkDate (value) {
  const format = 'YYYY-MM-DD';
  console.log(moment(value, format, undefined, true).isValid());
  if (moment(value, format, undefined, true).isValid() && moment(value).isAfter('1999-01-04')) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  questions
};
