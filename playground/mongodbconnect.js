// const MongoClient  = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017', (err, database)=>{
      if(err){
        return console.log('Unable to connect to database server');
      }
    console.log('Connected to mongoDB Server');
    let db = database.db('todoApp')

   /*
    db.collection('Todos').insertOne({
        text: 'Something else to do',
        completed: 'False'
    }, (err, result)=> {
           if(err){
               return console.log('Unable to insert todo', err);
           }
           console.log(JSON.stringify(result.ops,undefined,2));
          
    }) */

    // db.collection('Users')
    // .insertOne({
    //     name: 'Jide',
    //     Age: 36,
    //     location: 'Sharjah'
    // }, (err, res)=>{
    //     if(err){
    //         return console.log('Unable to insert todo', err);
    //     }
    //     console.log(res.ops[0]._id.getTimestamp());
    // })
    database.close();
})