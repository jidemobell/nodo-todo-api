const {ObjectID} = require('mongodb');
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')
const {mongoose} = require('./../server/db/mongoose')

let id = '5a8df3d5c825633bb312b676';

if(!ObjectID.isValid(id)){
    console.log('ID not valid')
}

// Todo.remove({}).then((result)=>{
//     console.log(result)  // a result object is returned 
//                          //with number of rec removed and other junks
// })

//Todo.findOneAndRemove
//Todo.findByIdAndRemove

Todo.findOneAndRemove({_id: '5a8df3d5c825633bb312b676'}).then((todo)=>{ //get all of oue todo
  
    console.log(JSON.stringify(todo,undefined,2))
 })

Todo.findByIdAndRemove(id).then((todo)=>{ //get all of oue todo
    if(!todo){
        return console.log('Unable to find todo')
    }
    console.log(JSON.stringify(todo,undefined,2))
 }).catch(e => console.log(e))