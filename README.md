## Command-Line Exchange Rate Lookup
### Built with Node, commander and inquirer

### Project description:
This project allows users to query historical exchange rates via the API at exchangeratesapi.io,
and returns a currency conversion based on those rates. From the command line, users are prompted
for four inputs: date, base currency, base amount and conversion currency. The program will output
a JSON object that includes the value of the base currency amount in the conversion currency.

### To build this project:
* Run `git clone https://github.com/jprittie/rate-lookup`.
* Navigate to the project root by entering `cd rate-lookup`.
* Run `npm install` to install the dependencies.
* Run `npm start` to start the program. You should see a series of four command-line prompts asking you
to enter information.
* The program should return an object with the following shape:
  `{
   "date": "2017-06-03",
   "base_currency": "USD",
   "base_amount": 100,
   "conversion_currency": "CAD",
   "conversion_amount": 135.23
   }`


### To test this project:
* Enter `npm run test` to run the unit and integration tests.
