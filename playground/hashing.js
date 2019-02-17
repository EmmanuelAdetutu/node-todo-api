const {SHA256} = require('crypto-js');
const jwt = require ('jsonwebtoken');

var data = {
  id: 10
  };

var token = jwt.sign(data, '123abc');
console.log(`JWT Token: ${token}`);

var decoded = jwt.verify(token, '123abc');
console.log('JWT Decoded:', decoded);

// var message = 'I am a user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
