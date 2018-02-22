const express = require('express');
const {ObjectID} = require('mongodb');
const bodyParser = require('body-parser')
const port = process.env.PORT || 3000;
const _ = require('lodash');

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

app.delete('/todos/:id', (req,res)=>{
    let reqId = req.params.id

    if(!ObjectID.isValid(reqId)){
        res.status(404).send('ID not valid')
    }

    Todo.findByIdAndRemove(reqId).then((todo)=>{ //get all of oue todo
        if(!todo){     //not found
            return res.status(404).send() //return to end 
        }
        res.status(200).send({    //success
            todo,
            text: 'successfully removed'
        })
     }).catch(e => res.status(400).send())
})

app.patch('/todos/:id', (req,res)=>{
    let reqId = req.params.id
    
    let body =_.pick(req.body,['text','completed']); // subset of what user passed

    if(!ObjectID.isValid(reqId)){
        res.status(404).send('ID not valid')
    }

    if(_.isBoolean(body.completed) && body.completed === true ) {
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(reqId, {$set: body}, {new: true})
    .then((todo)=>{ 
        if(!todo){    
            return res.status(404).send() 
        }
        res.status(200).send({   
            todo,
            text: 'successfully updated'
        })
     }).catch(e => res.status(400).send())

})

app.listen(port, ()=>{
    console.log(`started on port ${port}`)
})

module.exports = {app}







