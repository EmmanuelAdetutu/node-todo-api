const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require ('./../server');
const {Todo} =require ('./../models/todo');

//Make anarray of dummy todos
const todos =[{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
    _id: new ObjectID(),
  text: 'Second test todo',
  completed: true,
  completedAt: 333
}];

beforeEach((done) => {
  Todo.deleteMany({}).then(() =>{
    return Todo.insertMany(todos);
  }).then(() =>done());
});


describe('POST /todos', () => {
  it ('should create a new todo', (done) =>{
    var text = 'Test todo text';

    request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) =>{
           expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
          if (err) {
            return done(err);
          }

          Todo.find({text}).then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }).catch((e) => done(e));

        });
  });


  it('Should not create todo with empty invalid body data', (done) => {
    request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Todo.find().then((todos) => {
            expect(todos.length).toBe(2);
            done();
          }).catch((e) => done(e));
        });
  });
 });

//GET test for all items
 describe('GET /todos', () => {
   it ('should Get all todo Items', (done) =>{
      request(app)
         .get('/todos')
         .expect(200)
         .expect((res) =>{
            expect(res.body.todos.length).toBe(2);
         })
         .end(done);
   });
  });

//GET test for single item.
  describe('GET /todos/:id', () => {
    it ('should Get a todo Item', (done) =>{
       request(app)
          .get(`/todos/${todos[0]._id.toHexString()}`)
          .expect(200)
          .expect((res) =>{
             expect(res.body.todos.text).toBe(todos[0].text);
          })
          .end(done);
    });

    it ('should return 404 if todo not found', (done) => {
      var id = new ObjectID().toHexString();
      request(app)
         .get(`/todos/${id}`)
         .expect(404)
         .end(done);
    });

    it ('should return 404 for non object idS', (done) => {
      request(app)
         .get(`/todos/123abc`)
         .expect(404)
         .end(done);
    });
   });

//describe test for Delete
 describe('Delete /todos/:id', () =>{

   it('Should remove a todos', (done) => {
     var hexId = todos[1]._id.toHexString();
     request(app)
     .delete(`/todos/${hexId}`)
     .expect(200)
     .expect((res) =>{
        expect(res.body.todos._id).toBe(hexId);
     })
     .end((err, res) => {
       if (err) {
         return done(err);
       }
       Todo.findById(hexId).then((todos) => {
         expect(todos).toNotExist();
         done();
       }).catch((e) => done(e));
     });



   });

    it('should return 404 if todo not found', (done) =>{
      var id = new ObjectID().toHexString();
      request(app)
         .delete(`/todos/${id}`)
         .expect(404)
         .end(done);
   });
   //
    it('should return 404 if object id is invalid', (done) =>{
   request(app)
      .delete(`/todos/123abc`)
      .expect(404)
      .end(done);
    });


 });

// Test for Patch route
describe('PATCH /todos/:id', () => {
  it ('should update the todo', (done) =>{
    //grab id of first items
    var hexId = todos[0]._id.toHexString();
    var text = "This is new Text";
    request(app)
    .patch(`/todos/${hexId}`)
    .send({completed: true, text: text})  //update text, set completed true
    .expect(200) //expect 200
    .expect((res) =>{
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe('true');  //expect text is changed, completed is true,
      expect(res.body.todo.completedAt).toBeA('number');
     })
     .end(done);

  });

   it ('should clear completedAt when todo is not completed', (done) =>{
     //grab id of second todo item

     var hexId = todos[1]._id.toHexString();
     var text = "This is new Text 2";
     request(app)
     .patch(`/todos/${hexId}`)
     .send({completed: false, text: text})  //update text, set completed false
     .expect(200) //expect 200
     .expect((res) =>{
       expect(res.body.todo.text).toBe(text);
       expect(res.body.todo.completed).toBe('false');  //expect text is changed, completed is false,
       expect(res.body.todo.completedAt).toNotExist(); //expect completedAt is null .toNotExist
      })
      .end(done);

   });
});
