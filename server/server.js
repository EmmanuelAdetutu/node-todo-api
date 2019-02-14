var express = require ('express');
var bodyParser = require('body-parser');


var {mongoose} = require ('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

//create variable to store application in express
var app = express();

//Getting data sent from client
app.use(bodyParser.json());

//Configuring a POST route, this route enables creationg of new todos
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

//save to database
 todo.save().then ((doc) => {
  res.send(doc);
 }, (e) =>{
   res.status(400).send(e);
 });

});

//Configuring a GET route, this route enables fetchin  of todos
app.get('/todos', (req, res) => {

//Fetch all from to database
 Todo.find().then ((todos) => {
  res.send({todos});
 }, (e) =>{
   res.status(400).send(e);
 });

});

//set port and  callback funtion to fire when application is started
app.listen(3000,() => {
  console.log('Started on port 3000');
});


//export the app as to access in test file.
module.exports = {app};
