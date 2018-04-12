var env = process.env.NODE_ENV || 'development';

env = env.trim();

if (env === 'development' || env  === 'test') {
  var config = require ('./config.json');
  console.log ('1111GOT HERE',config);
  var envConfig = config[env];
  Object.keys(envConfig).forEach ((key) => {
    process.env[key] = envConfig[key];
    console.log (`${key} =${envConfig[key]}`);

  })

}


// if (env === 'development') {
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
//
// } else if (env.trim() === 'test'){
//   process.env.PORT = 3000;
//   process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
// }
// else {
//   process.env.MONGODB_URI = 'mongodb://MongoUser:Pentium12*@ds155473.mlab.com:55473/todoapp11111'
// }
