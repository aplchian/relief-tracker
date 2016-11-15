/*jshint esversion: 6 */
const testLibary = require('./testLibrary.js');

testFn = process.argv[2];

testLibary[testFn]();
