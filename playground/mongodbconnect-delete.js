const  {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', (err, database)=>{
      if(err){
        return console.log('Unable to connect to database server');
      }
    console.log('Connected to mongoDB Server');
    let db = database.db('todoApp')

    // db.collection('Todos').deleteMany({
    //     text: 'Eat Lunch'
    // }).then((success)=>{
    //     console.log(success)
    // })


    // db.collection('Todos').deleteOne({
    //     text: 'Eat Lunch'
    // }).then((success)=>{
    //     console.log(success)
    // })

    db.collection('Todos').findOneAndDelete({
        completed: false
    }).then((doc)=>{     //promise => returns the document back
        console.log(doc)
    })
   
    database.close();
})