const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect ('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err){
    return console.log ('Unable to connect to MongoDB server');
  }
  console.log ('Connected to MongoDB server');
  const db = client.db('TodoApp');

  //deleteMany
// db.collection ('Todos').deleteMany({text: 'Eat lunch'}).then((result) =>{
//   console.log (result);
// })

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then ((result) => {
  //   console.log (result);
//  });

  //findOne and Delete
  // db.collection('Todos').findOneAndDelete({completed: false}).then ((result) => {
  //   console.log (result);
  // client.close();
  //  });


  // db.collection('Users').deleteMany ({name: 'Rodney'}).then ( (result) => {
  //   console.log (result);
  // });


  db.collection('Users').findOneAndDelete ({
    _id: new ObjectID("5ac4b1afd6da892c28f408fd")
  }).then ((result) => {
    console.log(result);
  });

  client.close();


});
