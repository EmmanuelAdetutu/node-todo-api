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


  //deleteMany
   // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) =>{
   //   console.log(result);
   // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) =>{
  //   console.log(result);
  // });
  //
  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) =>{
  //   console.log(result);
  // });


  //challange
  //deleteMany
 // db.collection('Users').deleteMany({name: 'Emmanuel'}).then((result) =>{
 //   console.log(result);
 // });

 //findOneAndDelete
 db.collection('Users').findOneAndDelete({_id:  new ObjectID('5c633545f27f7527880179fc')}).then((result) =>{
   console.log(JSON.stringify(result, undefined, 2));
 });

   // db.collection('Users').find({name: 'Emmanuel'}).toArray().then((docs) => {
   //  console.log(JSON.stringify(docs, undefined, 2));
   // },(err) => {
   //   console.log('Unable to fetch Todos', err);
   // });


//client.close();
});
