require ('./config/config');
const _ = require('lodash');
const {ObjectID} = require('mongodb');
const express = require ('express');
const bodyParser = require('body-parser');


var {mongoose} = require ('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

//create variable to store application in express
var app = express();
const port = process.env.PORT;
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

//Configuring a GET route, this route enables fetching all todos
app.get('/todos', (req, res) => {

//Fetch all from to database
 Todo.find().then ((todos) => {
  res.send({todos});
 }, (e) =>{
   res.status(400).send(e);
 });

});

//Configuring a GET route, this route enables fetching all todos
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  //validate if ID is an object
  if (!ObjectID.isValid(id)) {return res.status(404).send();}

  //Fetch data by valid ID
  Todo.findById(id).then((todos) =>{
     if (!todos) {
      return res.status(404).send();  //if empty send 404
     }
     res.send({todos});
  }).catch((e) => {res.status(400).send();});
//);
});


//Configuring a Delete route, this route enables Deleteing of Items all todos
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;
  //validate if ID is an object
  if (!ObjectID.isValid(id)) {return res.status(404).send();}

  //Delete data by valid ID
  Todo.findByIdAndDelete(id).then((todos) =>{
     if (!todos) {
      return res.status(404).send();  //if empty send 404
     }
     res.status(200).send({todos}); //if ok send doc with status 200
  }).catch((e) => {res.status(400).send();});
//);
});


app.patch('/todos/:id', (req, res) =>{
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  }else {
    body.completed = false;
    body.completedAt = null;
  }

    Todo.findOneAndUpdate(id, {$set: body}, {new: true}).then((todo) =>{
      if (!todo) {
        return res.status(404).send();
      }
      res.send({todo});
    }).catch((e) => {
      res.status(400).send();
    })
});


//set port and  callback funtion to fire when application is started
app.listen(port,() => {
  console.log(`Started on port ${port}`);
});

//export the app as to access in test file.
module.exports = {app};
