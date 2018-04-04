const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect ('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err){
    return console.log ('Unable to connect to MongoDB server');
  }
  console.log ('Connected to MongoDB server');
  const db = client.db('TodoApp');

// db.collection ('Todos').find({
//   _id: new ObjectID ('5ac4b00f82ca4a354807e1ff'
// }).toArray().then( (docs) => {
//   console.log ('Todos');
//   console.log (JSON.stringify (docs, undefined, 2))
//
// }, (err) => {
//     console.log ('Unable to fetch todos', err);
// })

// db.collection ('Todos').find().count().then( (count) => {
//   console.log (`Todos count: ${count}`);
//
//
// }, (err) => {
//     console.log ('Unable to fetch todos', err);
// })

const FindNames = ( Nameinput ) => {db.collection ('Users').find ({
    name: Nameinput
}).toArray().then ((docs) =>{
  console.log (docs);
}, (err) => {
    console.log ('unable to fetch users');
});
}
FindNames ('Joe');
  client.close();

});
