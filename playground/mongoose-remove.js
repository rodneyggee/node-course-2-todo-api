const {mongoose} = require ('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

const {ObjectID} = require ('mongodb');

Todo.findByIdAndRemove ('5aca07d5cfb7ab3a9c93f436').then ((todo) => {
  console.log(todo);
});
