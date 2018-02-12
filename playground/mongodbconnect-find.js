 const  {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', (err, database)=>{
      if(err){
        return console.log('Unable to connect to database server');
      }
    console.log('Connected to mongoDB Server');
    let db = database.db('todoApp')

    // db.collection('Todos').find({_id: new ObjectID('5a805c8e152b8e35dc5145a5')}).toArray().then((docs)=>{      //returns a promise
    //     console.log('Todos')
    //     console.log(JSON.stringify(docs,undefined,2))
    // }, (err)=>{
    //     console.log('unable to fetch documents', err)
    // })

    db.collection('Todos').find().count().then((count)=>{      //returns a promise
        console.log(`Todos count: ${count}`)
    }, (err)=>{
        console.log('unable to fetch documents', err)
    })
   
    database.close();
})