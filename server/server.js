const express = require('express');
const {ObjectID} = require('mongodb');
const bodyParser = require('body-parser')

let {mongoose} = require('./db/mongoose')
let {Todo} = require('./models/todo')
let {User} = require('./models/user')
let app = express();

app.use(bodyParser.json());  //not a custom middleware

app.post('/todos', (req,res)=> {
       let todo = new Todo({
        text: req.body.text 
       });

       todo.save().then((doc)=>{
            res.send(doc)
       },(e)=>{
           res.status(400).send(e)
       })
       
})



app.get('/todos', (req,res)=>{
    Todo.find().then(todos=>{
        res.send({
            todos,
            code: 'asdf'
        })
    },(e)=>{
        res.status(400).send(e);
    })
})

app.get('/todos/:id',(req,res)=>{
    let reqId = req.params.id

    if(!ObjectID.isValid(reqId)){
    res.status(400).send('ID not valid')
}

    Todo.findById(reqId).then((todo)=>{ //get all of oue todo
        if(!todo){
            return res.status(404).send()
        }
        res.send({
            todo,
            text: 'matching todo'
        })
     }).catch(e => res.status(400).send())
})

app.listen(3000, ()=>{
    console.log('started on port 3000')
})

module.exports = {app}







