const expect = require('expect');
const request = require('supertest');

const {app} = require ('./../server');
const {Todo} =require ('./../models/todo');

//console.log('I am  out side here');

beforeEach((done) => {
  //console.log('I am in before Each');
  Todo.deleteMany({}).then(() => done());
});

//var fgfg = done();
describe('POST /todos', () => {
  it ('should create a new todo', (done) =>{
    var text = 'Test todo text2';

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

          Todo.find().then((todos) => {
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
            expect(todos.length).toBe(0);
            done();
          }).catch((e) => done(e));
        });
  });
 });
