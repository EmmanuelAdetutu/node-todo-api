//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',{ useNewUrlParser: true }, (err, client) => {
  if (err) {
  return console.log('Unable to connect to MongoDB server');
}
  console.log('Connected to MongoDb server.');
  const db = client.db('TodoApp');

//   db.collection('Todos').insertOne({
//     text: 'Somethin to do',
//     completed:false
//
//   }, (err, result) =>{
//     if (err) {
//       return console.log('Unable to insert todo', err);
//     }
//     console.log(JSON.stringify(result.ops, undefined, 2));
//   })
//   client.close();
// });

// db.collection('Users').insertOne({
//   name: 'Emmanuel',
//   age: 25,
//   location: 'Eindhoven'
//
// }, (err, result) =>{
//   if (err) {
//     return console.log('Unable to insert User', err);
//   }
//   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
// })
client.close();
});
