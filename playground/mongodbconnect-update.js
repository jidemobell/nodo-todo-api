const  {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017', (err, database)=>{
      if(err){
        return console.log('Unable to connect to database server');
      }
    console.log('Connected to mongoDB Server');
    let db = database.db('todoApp')
    
   //findOneandUpdate returns updated doc
   //returns a promise if no call back is passed in
    // db.collection('Todos').findOneAndUpdate({
    //     _id : new ObjectID('5a8216bfdaaa6274019bd2c3')
    // }, {
    //     $set: {text : 'Eat Lunch'}
    // },{returnOriginal: false}).then((result)=>{
    //     console.log(result)
    // })
    
    // database.close();

     db.collection('Users').findOneAndUpdate({
      name : 'Jide'
    }, {
        $inc: {Age : 1}
    },{returnOriginal: false}).then((result)=>{
        console.log(result)
    })
    
    database.close();


})