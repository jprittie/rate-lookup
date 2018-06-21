// 'use strict';

const axios = require('axios');
const program = require('commander');
const inquirer = require('inquirer');

const { questions } = require('./command-line');

module.exports = {
  getData
};

// program
//   .command('getData <date> <baseAmt> <baseCurr> <convCurr>')
//   .alias('a')
//   .description('Look up a historical exchange rate')
//   .action((date, baseAmt, baseCurr, convCurr) => {
//     getData({date, baseAmt, baseCurr, convCurr});
//   });
//
// program.parse(process.argv);

program
  .command('lookUpRate')
  .alias('l')
  .description('Look up historical exchange rate')
  .action(() => {
    inquirer.prompt(questions).then(answers => {
      console.log('answers', answers);
      const { date, baseCurr, baseAmt, convCurr } = answers;
      getData(date, baseCurr, baseAmt, convCurr);
    });
  });

program.parse(process.argv);

function getData (date, baseCurr, baseAmt, convCurr) {
  const url = `https://exchangeratesapi.io/api/${date}?base=${baseCurr}`;
  // convert baseCurr and convCurr to all caps
  // parseFloat?
  baseAmt = parseInt(baseAmt);

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

// Do currency conversion and reformat JSON
function convertCurrency (date, baseCurr, baseAmt, convCurr, apiResponse) {
  let newAmt = baseAmt * apiResponse.rates[convCurr];
  newAmt = parseFloat((Math.round(newAmt * 100) / 100).toFixed(2));
  // JSON in command line doesn't have quotes around keys
  const reformattedResponse = {
    'date': date,
    'base_currency': baseCurr,
    'base_amount': baseAmt,
    'conversion_currency': convCurr,
    'conversion_amount': newAmt
  };
  return reformattedResponse;
}
