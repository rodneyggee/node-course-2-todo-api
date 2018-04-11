
const {app} = require ('./../server');

const expect = require ('expect');
const request = require ('supertest');
const {ObjectID} = require ('mongodb');
const {todos, populateTodos, users, populateUsers } = require ('./seed/seed');

const {Todo} = require ('./../models/todo');
const {User} = require ('./../models/user');

beforeEach( populateUsers );
beforeEach( populateTodos );

describe ('POST /todos', () => {
  it ('should create a new todo', (done) =>{
    var text = 'Todo test';
    request (app)
      .post ('/todos')
      .set ('x-auth', users[0].tokens[0].token)
      .send ({text})
      .expect (200)
      .expect ((res)=>{
          expect(res.body.text).toBe(text)
        })
        .end ((err,res) => {
          if (err) {
            done (err);
          }
          Todo.find({text}).then ((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }).catch((e) => done(e));
        });

  });


  it ('should not create a todo with invalid body data', (done) => {
      request(app)
      .post('/todos')
      .set ('x-auth', users[0].tokens[0].token)
      .send({})
      .expect(400)
      .end ((err,res) => {
        if (err) {
          return done(err);
        }
      })

      Todo.find().then((todos) =>{
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done (e));
  });
});
describe ('GET /todos', () => {
  it ('should get all todos', (done) =>
  {
    request(app)
    .get('/todos')
    .set ('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect ( (res) => {
      expect (res.body.todos.length ).toBe(1);
    })
    .end (done);
  });
});

describe ('GET / todos/:id', () => {
  it ('should return todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .set ('x-auth', users[0].tokens[0].token)
    .expect (200)
    .expect ((res) => {
      expect (res.body.todo.text).toBe(todos[0].text);
    })
    .end (done);

    });

    it ('should return not todo doc create by other user', (done) => {
      request(app)
      .get(`/todos/${todos[1]._id.toHexString()}`)
      .set ('x-auth', users[0].tokens[0].token)
      .expect (404)
      .end (done);


  });
  it ('should return a 404 if todo not found', (done) => {
    //valid object id but not in collection
    request(app)
    .get(`/todos/${new ObjectID ().toHexString()}`)
    .set ('x-auth', users[0].tokens[0].token)
    .expect (404)
    .end (done);
  });
  it ('should return a 404 for non object IDs', (done) => {
    //not valid object ID
    request(app)
    .get('/todos/123')
    .set ('x-auth', users[0].tokens[0].token)
    .expect (404)
    .end (done);
  });
});
describe ('DELETE / todos/:id', () => {

  it ('should delete a todo doc', (done) => {
    var id = todos[1]._id.toHexString();
    request(app)
    .delete (`/todos/${id}`)
    .set ('x-auth', users[1].tokens[0].token)
    .expect (200)
    .expect ((res) => {
      expect (res.body.todo.text).toBe(todos[1].text);

    })
    .end ((err, res) => {
      if (err) {
        return done(err);
      }
      Todo.findById(id).then((todo) =>{
        expect(todo).toNotExist();
        done();
        }).catch((e) => done (e));
    });
});

it ('should delete a todo doc', (done) => {
  var id = todos[0]._id.toHexString();
  request(app)
  .delete (`/todos/${id}`)
  .set ('x-auth', users[1].tokens[0].token)
  .expect (404)
  .end ((err, res) => {
    if (err) {
      return done(err);
    }
    Todo.findById(id).then((todo) =>{
      expect(todo).toExist();
      done();
      }).catch((e) => done (e));
  });
});



  it ('should return a 404 if todo not found', (done) => {
    //valid object id but not in collection
    request(app)
    .delete(`/todos/${new ObjectID ().toHexString()}`)
    .set ('x-auth', users[1].tokens[0].token)
    .expect (404)
    .end (done);
  });
  it ('should return a 404 for non object IDs', (done) => {
    //not valid object ID
    request(app)
    .delete('/todos/123')
    .set ('x-auth', users[1].tokens[0].token)
    .expect (404)
    .end (done);
 });


});

describe ('PATCH / todos/:id', () => {
  it ('should update the todo', (done) => {
    var id = todos[0]._id.toHexString();
    var update = { text: "test update",
      completed: true};
    request(app)
    .patch(`/todos/${id}`)
    .set ('x-auth', users[0].tokens[0].token)
    .send (update)
    .expect (200)
    .expect ((res) => {
      expect (res.body.todo.text).toBe(update.text);
      expect (res.body.todo.completed).toBe(true);
      expect (res.body.todo.completedAt).toBeA('number');

    })
    .end (done);
  });

  it ('should not update the todo created by anouther user', (done) => {
    var id = todos[0]._id.toHexString();
    var update = { text: "test update",
      completed: true};
    request(app)
    .patch(`/todos/${id}`)
    .set ('x-auth', users[1].tokens[0].token)
    .send (update)
    .expect (404)
    .end (done);
  });
  it ('should clear completed at when todo is not completed', (done) => {
    var id = todos[1]._id.toHexString();
    var update = { text: "test update",
      completed: false};
    request(app)
    .patch(`/todos/${id}`)
    .send (update)
    .set ('x-auth', users[1].tokens[0].token)
    .expect (200)
    .expect ((res) => {
      expect (res.body.todo.text).toBe(update.text);
      expect (res.body.todo.completed).toBe(false);
      expect (res.body.todo.completedAt).toNotExist();

    })
    .end (done);
  });
});
describe ('GET / users/me', () => {
  it ('should return user if authenticated', (done) => {
    request(app)
    .get('/users/me')
    .set ('x-auth', users[0].tokens[0].token)
    .expect (200)
    .expect ((res) => {

      expect(res.body._id).toBe(users[0]._id.toHexString());
      expect(res.body.email).toBe(users[0].email);
    })
    .end (done);

  });
  it ('should return at 401 if not authenticated', (done) => {
    request(app)
   .get('/users/me')
   .expect (401)
    .expect ((res) => {
       expect(res.body).toEqual({});
    })
  .end (done);
  });
})
describe ('POST /users', () => {

  it ('should create a user', (done) => {
    var email = 'example@example.com';
    var password = '123nmb!';
    request(app)
    .post ('/users/')
    .send ({email,password})
    .expect (200)
    .expect ((res) => {
      expect(res.headers['x-auth']).toExist();
      expect(res.body._id).toExist();
      expect(res.body.email).toBe(email);
    })
    .end ((err) => {
      if (err) {
        return done (err);
      }
      User.findOne ({email}).then ((user) => {
         expect (user).toExist();
         expect (user.password).toNotBe(password);
        done();
      }).catch ((e) => done(e));
    });

  });
  it ('should return validation errors if request invalid', (done) => {
    var email = 'dddd';
    var password = 's';
    request(app)
    .post ('/users/')
    .send ({email, password})
    .expect (400)
    .end (done)
  });
  it ('should not create not user if email in use', (done) => {
    var email = users[0].email;
    var password = 'ssdfsdfs@sdsd.com';
    request(app)
    .post ('/users/')
    .send ({email, password})
    .expect (400)
    .end (done)
  });
});

describe ('POST /users /login', () => {
  it ('should login user and return auth token', (done ) => {
    request(app)
    .post ('/users/login')
    .send ({
        email: users[1].email,
        password: users[1].password
    })
    .expect(200)
    .expect ((res) => {
      expect (res.headers['x-auth']).toExist();
    })
    .end ((err, res) => {
      if (err) {
        return done (err);
      }
      User.findById (users[1]._id).then ((user) => {
        expect (user.tokens[1]).toInclude ({
          access: 'auth',
          token: res.headers['x-auth']
        });
        done ();
      }).catch ((e) => done(e));
    });
  });
  it ('should reject invalid login', (done ) => {
    request(app)
    .post ('/users/login')
    .send ({
        email: users[1].email,
        password: 'dfsdfsdf'
    })
    .expect(400)
    .expect ((res) => {
      expect (res.headers['x-auth']).toNotExist();
    })
    .end ((err, res) => {
      if (err) {
        return done (err);
      }
      User.findById (users[1]._id).then ((user) => {
        expect (user.tokens.length).toBe(1);
        done ();
      }).catch ((e) => done(e));
    });
  });
})
describe ('DELETE /users/me/token', () => {
  it ('should remove auth token on logout', (done) => {
    request(app)
    .delete ('/users/me/token')
    .set ('x-auth', users[0].tokens[0].token)
    .expect (200)
    .end ((err, res) => {
      if (err) {
        return done (err);
      }
        User.findById (users[0]._id).then ((user) => {
          expect (user.tokens.length).toBe(0);
          done ();
        }).catch ((e) => done (e));
    })

  });

});
