const {mongoose} = require ('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

const {ObjectID} = require ('mongodb');

// var id = '5ac75404071b1e2cfc84f2bd11';
//
// if (!ObjectID.isValid(id))
// {
//   console.log('ID not valid');
// }
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos)
// });
//
// Todo.findOne ({
//   _id: id
// }).then((todo) => {
//   console.log('Todos', todo)
// });

// Todo.findById(id).then((todo) => {
// if (!todo){
//   return console.log ('Id not found');
// }
//   console.log('Todo by id', todo)
// }).catch((e) => console.log(e));

id = '5ac6613365103536bc557e4d';
User.findById(id).then ((user)=>{
  if (!user) {
    return console.log ('User not found', id)
  }
  console.log (user.email)
}).catch((e) => console.log(e));
