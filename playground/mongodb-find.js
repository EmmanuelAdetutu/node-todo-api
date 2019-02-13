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

   // db.collection('Todos').find({
   //   _id:  new ObjectID('5c63347095a31e3bb8de2177')
   // }).toArray().then((docs) => {
   //   console.log('Todos');
   //   console.log(JSON.stringify(docs, undefined, 2));
   // },(err) => {
   //   console.log('Unable to fetch Todos', err);
   // });


   // db.collection('Todos').find().count().then((count) => {
   //   console.log(`Todos Count: ${count}`);
   //   console.log(JSON.stringify(docs, undefined, 2));
   // },(err) => {
   //   console.log('Unable to fetch Todos', err);
   // });
   db.collection('Users').find({name: 'Emmanuel'}).toArray().then((docs) => {
    console.log(JSON.stringify(docs, undefined, 2));
   },(err) => {
     console.log('Unable to fetch Todos', err);
   });


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
//client.close();
});
