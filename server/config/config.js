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
