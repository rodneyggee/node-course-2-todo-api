var env = process.env.NODE_ENV || 'development';


if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';

} else if (env.trim() === 'test'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
else {
  process.env.MONGODB_URI = 'mongodb://MongoUser:Pentium12*@ds155473.mlab.com:55473/todoapp11111'
}
