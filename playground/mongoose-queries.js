const {ObjectID} = require('mongodb');
const {mongoose} = require ('./../server/db/mongoose');
const {Todo} = require ('./../server/models/todo');
const {User} = require ('./../server/models/user');

// var id = '5c655c5d638899263cc87b5d';
var id = '5c64a8467489ae4cec834add';
// if (!ObjectID.isValid(id)) {
//   console.log('Id not valid');
// }
// //find any
// Todo.find({
//   _id: id
// }).then((todos) =>{
//   console.log('Todos', todos);
// });
//
// //find one
// Todo.findOne({
//   _id: id
// }).then((todo) =>{
//   console.log('Todo', todo);
// });


User.findById(id).then((user) =>{
  if (!user) {
    return console.log('User Id not found');
  }
  console.log('User', user);
}).catch((e) => console.log(e));
