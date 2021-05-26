/*First Import required libraries. Specifically Express and jsonwebtoken*/
const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken')

/*Also import the task model... this is the framework or schema for our tasks collection */
const Task = require("../models/task.model.js")

/*Define variables which we will use to store some of our variables - in particular for the login*/
let tok ='';
let verify = 0;

/*This post request basically retrieves the username and password which the user entered. Based on what the user
submitted, we will generate a json web token. If the user enetered the correct username and password, we
will set the verified variable to 1 else it will remain at 0. I realise after doing this that i could have and
probably should have used the useState feature as it may have been better... but I think what i did also works*/
router.route('/login').post((req, res) => {
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
router.route("/resource").get(checkToken, (req, res) => {
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
    router.route("/task").get((req, res) => {
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
    router.route('/create').post((req, res) => {
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



      router.route('/delete1').post((req, res) => {
        let del1 = req.body.remove;
        Task.findOneAndRemove( {id: del1}, (error,deletedRecord) => {
            if(!error){
              res.json(deletedRecord);
            }
          })
      })



/*The post request below gets the updated inputs for the chosen task to update. If the user leaves an
input blank then the current values is retained, i.e. the attribute is left unchanged*/

    router.route("/updatemany1").post((req, res) => {
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

module.exports = router;