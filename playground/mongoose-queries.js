const {ObjectID} = require('mongodb');
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')
const {mongoose} = require('./../server/db/mongoose')

let id = '5a87ee49ef0e502a308bc7f2';

if(!ObjectID.isValid(id)){
    console.log('ID not valid')
}

// Todo.find({
//     _id: id
// }).then((todos)=>{ //get all of oue todo
//    console.log('Todos', todos)
// })

// Todo.findOne({
//     _id: id
// }).then((todo)=>{ //get all of oue todo
//     console.log('Todos', todo)
//  })

//  Todo.findById(id).then((todo)=>{ //get all of oue todo
//     if(!todo){
//         return console.log('ID not found')
//     }
//     console.log('TodoById', todo)
//  }).catch(e => console.log(e))

 /*
 if the ID doesnt exist in the DB,
 an error will not be thrown,
 throws empty array for find
 an null for others
 */


User.findById(id).then((user)=>{ //get all of oue todo
    if(!user){
        return console.log('Unable to find user')
    }
    console.log(JSON.stringify(user,undefined,2))
 }).catch(e => console.log(e))