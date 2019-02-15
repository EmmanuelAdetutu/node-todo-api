const {ObjectID} = require('mongodb');
const {mongoose} = require ('./../server/db/mongoose');
const {Todo} = require ('./../server/models/todo');
const {User} = require ('./../server/models/user');


// Todo.remove({}).then((result) => {
//   console.log(result);
// });



// Todo.findOneAndDelete('5c66f3228fd57417645a01a2').then ((todo) => {
//   console.log(todo);
// });

Todo.findByIdAndDelete('5c66f4f68d211a047836f02a').then ((todo) => {
  console.log(todo);
});



// Todo.FindByIdAndRemove
