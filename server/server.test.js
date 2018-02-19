const request = require('supertest')
const expect = require('expect');
const {app} = require('./server');
const {Todo} = require('./models/todo')

const todos = [{
    text: 'First test todo'
},
{
    text: 'second test todo'
}]

beforeEach((done)=>{
    // this always empties the collection
    Todo.remove({}).then(()=>{
        return Todo.insertMany(todos)
    }).then(()=> done());
})

describe('POST /todos', ()=>{
        test('should create a new todo', (done)=>{
            let text = 'Test todo text'
            request(app) //use app
            .post('/todos') //post to it's todo route
            .send({text})  //send the text above
            .expect(200)   //expect a successful response
            .expect((res)=>{
               expect(res.body.text).toBe(text) //expect response test to be same as above
            })

            //at this point a doc has been created to Todo
            .end((err, res)=>{
                if(err){
                    return done(err)
                }
                Todo.find({text}).then((todos)=>{
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e)=> done(e))
            });
        });

        test('should not create todo with invalid data', (done)=>{
            
            request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err,res)=>{
                if(err){
                    return done(err)
                }
                Todo.find().then((todos)=>{
                    expect(todos.length).toBe(2);
                    done()
                }).catch(e => done(e))
            })
        })

})


describe('GET /todos', ()=> {
    test('shout fetch all todos', (done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{   //custom assertion
            expect(res.body.todos.length).toBe(2)
        })
        .end(done);
    })
})