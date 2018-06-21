'use strict';

const axios = require('axios');
const program = require('commander');
const inquirer = require('inquirer');

const { questions } = require('./command-line');

module.exports = {
  getData,
  convertCurrency
};

/** Commander and inquirer are used to prompt user and validate input. */
program
  .command('lookUpRate')
  .alias('l')
  .description('Look up historical exchange rate')
  .action(() => {
    inquirer.prompt(questions).then(answers => {
      const { date, baseCurr, baseAmt, convCurr } = answers;
      getData(date, baseCurr, baseAmt, convCurr);
    });
  });

program.parse(process.argv);

/** function getData takes data entered by the user, calls the API and returns reshaped data. */
function getData (date, baseCurr, baseAmt, convCurr) {
  const url = `https://exchangeratesapi.io/api/${date}?base=${baseCurr}`;
  baseAmt = parseFloat(baseAmt);

  return axios
    .get(url)
    .then(response => response.data)
    .then(apiData => {
      const results = convertCurrency(date, baseCurr, baseAmt, convCurr, apiData);
      console.log(results);
      return results;
    })
    .catch(function (error) {
      console.log('API call error', error);
    });
}

/** function convertCurrency does the currency conversion and creates the object to return. */
function convertCurrency (date, baseCurr, baseAmt, convCurr, apiResponse) {
  let newAmt = baseAmt * apiResponse.rates[convCurr];
  newAmt = parseFloat((Math.round(newAmt * 100) / 100).toFixed(2));
  const reformattedResponse = {
    'date': date,
    'base_currency': baseCurr,
    'base_amount': baseAmt,
    'conversion_currency': convCurr,
    'conversion_amount': newAmt
  };
  return reformattedResponse;
}
