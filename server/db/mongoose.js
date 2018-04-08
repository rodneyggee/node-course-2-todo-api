var mongoose = require ('mongoose');

mongoose.Promise = global.Promise
if(process.env.PORT){
 // connectPath = "ds155473.mlab.com:55473/todoapp11111";
 // options= {
 //     auth: {
 //         user: 'MongoUser',
 //         password: 'Pentium12*'
 //     }
 // }
 connectPath = "mongodb://MongoUser:Pentium12*@ds155473.mlab.com:55473/todoapp11111"
} else {
 connectPath = "mongodb://localhost:27017/TodoApp";
 options = {}
}
mongoose.connect(connectPath);

module.exports = { mongoose }
