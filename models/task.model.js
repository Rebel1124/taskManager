//We first import mongoose.
const mongoose = require('mongoose');



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

  //We then export this model along with its schema.
module.exports = mongoose.model('tasks', TaskSchema);