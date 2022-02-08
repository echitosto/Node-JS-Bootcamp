//console.log(arguments)
//console.log(require('module').wrapper);

//module.exports
const Calculator = require('./test-module-1');
const calculadora = new Calculator();
console.log(calculadora.add(3,5));

//exports
//const calculadora1 = require('./test-module-2');
const { add, multiply, divide} = require('./test-module-2');
console.log(add(3,5));

//caching
require('./test-module-3')();
require('./test-module-3')();