
const express = require('express')
const Datastore = require ('nedb')

const app = express();
const port = process.env.PORT ||3000;
app.listen(port, ()=> {
  console.log(`starting server at ${port}` )
});
app.use(express.static('public'))
app.use(express.json({limit:"1mb"}))

const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) =>{
  //database.find({}, (err, data) =>{
  database.find({}).sort({timestamp: -1 }).exec(function (err, data) {
    if(err){
      response.end();
      return;
    }
    console.log("I update the responses! ");
    response.json(data);
  })
})

app.post('/api', (request, response) =>{
  console.log("I got request! ");
  const data = request.body
  const timestamp = Date.now()
  data.timestamp = timestamp;
  // database.find({}).sort({timestamp: -1 }, (err, data) =>{
  // response.json(data);
  //
  // })
  database.insert(data);
  response.json(data);

});
