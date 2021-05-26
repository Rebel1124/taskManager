/*First we import the required libraries, in particular express and mongoose.*/

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')

let tok ='';
let verify = 0;

app.use(cors());
app.use(express.json());


/*Next we connect to to our list database using mongoose.*/

const uri = 'mongodb+srv://Desi:Sharks_08@hyperion-web-dev.5pcl0.mongodb.net/test?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;

mongoose.connect(uri, {
	useMongoClient: true
});


mongoose.connection.on('error', function() {
	console.log('Connection to Mongo established.');
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
})


/*Here we import our controllers... this is where we have defined our CRUD operations in the backend.
Our frontend react app sends requests which triggers these CRUD methods and in this way we are able to
manage our database.*/

////app.use('/', require("./controllers/task.controller.js"));



//Next we outline the schema for the tasks in our tasks database.
const TaskSchema = mongoose.Schema({
  id:{
      type:Number,
      required:true
  },
  task:{
    type:String,
    required:true
  },
  assign:{
     type:String,
     required:true
  },
  cash:{
      type:String,
      required:true
  },
  email:{
      type:String,
      required:true
  },
  progress:{
      type:String,
      required:true
  },
});

const Task = mongoose.model('tasks', TaskSchema);



/*This post request basically retrieves the username and password which the user entered. Based on what the user
submitted, we will generate a json web token. If the user enetered the correct username and password, we
will set the verified variable to 1 else it will remain at 0. I realise after doing this that i could have and
probably should have used the useState feature as it may have been better... but I think what i did also works*/
app.post('/login',(req, res) => {
  const usr = req.body.username;
  const pwd = req.body.password;
  
      if(usr === 'desiRed' && pwd === 'sharksRule') {
          verify = 1;
      } else {
          verify = 0;
      }
    
      payload = {
          'name': usr,
          'password': pwd
          
          }
          const token = jwt.sign(JSON.stringify(payload), 'jwt-secret',
          {algorithm: 'HS256'})
          res.send({'token': token, 'verify':verify})
      
  })




/*Check to make sure header is not undefined, if so, return Forbidden (403)... this is the middleware we will
use in our get request below*/
const checkToken = (req, res, next) => {
  const header = req.headers['authorization'];

  if(typeof header !== 'undefined') {
      const bearer = header.split(' ');
      const token = bearer[1];
      tok=token;
      next();
  } else {
      //If header is undefined return Forbidden (403)
      res.sendStatus(403)
  }
}


/*The below get request basically authenticates the user and checks if the details entered is correct*/
app.get("/resource", checkToken, (req, res) => {
  try {
      const decoded = jwt.verify(tok, 'jwt-secret')
      const user = `${decoded.name}`;
      const pass = `${decoded.password}`
      if(user === 'desiRed' && pass === 'sharksRule') {
          verify = 1;
          Task.find()
           .then(foundTask => res.send({'auth': `${verify}`, 'data1': foundTask}))
          
      } else {
          verify = 0;
          res.send({'auth': `${verify}`})

      }
  
  }catch (err) {
      verify = 0;
      res.status(401).send({'err': 'Bad JWT!', 'auth': `${verify}`})
  }
})


/*I sent the  json data from my mongodb database to the /task url... once the user is authenticated
I retrive or fetch the data from here.*/
app.get("/task",(req, res) => {
  if(verify === 1) {
  try {
      const decoded = jwt.verify(tok, 'jwt-secret')
      Task.find()
      .then(foundTask => res.json(foundTask))

  }catch (err) {
      res.status(401).send({'err': 'Bad JWT!'})
      }
  } 
  else {
      res.send({'msg': 'Incorrect Login'})
  }
})

/*This post request is used to create a new task */
app.post('/create',(req, res) => {
  const id = req.body.id;
  const task = req.body.task;
  const assign = req.body.assign;
  const cash = req.body.cash;
  const email = req.body.email;
  const progress = req.body.progress;

  const newTask = new Task({
    id,  
    task,
    assign,
    cash,
    email,
    progress
  });
  newTask.save();
});


/*This post requst is used to get the name of the task which the user wants to delete. We store this in the
variable del1... again I could have used useState for this as well. We also remove this task  from the collection
using the findOneAndRemove method*/



app.post('/delete1',(req, res) => {
  let del1 = req.body.remove;
  Task.findOneAndRemove( {id: del1}, (error,deletedRecord) => {
      if(!error){
        res.json(deletedRecord);
      }
    })
})



/*The post request below gets the updated inputs for the chosen task to update. If the user leaves an
input blank then the current values is retained, i.e. the attribute is left unchanged*/

app.post("/updatemany1",(req, res) => {
  let ids = req.body.id;
  let updatedTask = req.body.task;
  let updatedAssign = req.body.assign;
  let updatedCash = req.body.cash;
  let updatedEmail = req.body.email;
  let updatedProgress = req.body.progress;

  Task.updateMany( {id: ids}, {task: updatedTask, assign: updatedAssign, cash: updatedCash, 
      email: updatedEmail, progress: updatedProgress}, {new: true}, (error,updateRecord) => {
      if(!error){
        res.json(updateRecord);
      }
    })


});




/*We use app.use() to include any built-in middleware functions we need in our app. Here 
we use reference the index.html from the build folder of the frontend react app.*/
app.use(express.static(path.join(__dirname, 'build')));
app.get('*',(req,res)=> {res.sendFile(path.resolve(__dirname, 'build','index.html'));});



/*Next we setup the port that our server will be listening on. This is the proxy server for our 
frontend react app.*/
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
});