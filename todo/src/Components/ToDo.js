/*First import the required libraries, including React and axios */
import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import { Container, Row, Col, Table } from 'react-bootstrap';

/*Define an empty list... we will use this to store the tasks from the mongodb list collection */
let list = [];

/*Create the Todo component. This will allow the user to view th list as well as manage it */
class Todo extends Component {
    constructor(props){
      super(props);
      this.state = {
        list1:[],
        };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.removeButton = this.removeButton.bind(this);
      this.updateButton = this.updateButton.bind(this)
    };


/*After the user is authenticated, we fetch the existing list from the mongodb database and display it
in the body of our webpage */
    componentDidMount() {
     
        fetch(`/task`)
        .then((res) => res.json())
        .then((result) => {
        this.setState({
          list1: result});
        })
        .then((check) => console.log(this.state.list1))
      
        .then((set) => {
          list = [];

          if(this.state.list1.msg || this.state.list1.err) {
          list = []
          } else {
            if(this.state.list1.length > 0) {
              for(let i = 0; i<this.state.list1.length; i++) {
                list.push(this.state.list1[i].id);
              }
            }
          }
        })

            .then((populate) => {

              if(this.state.list1.msg === 'Incorrect Login') {

                document.getElementById('myList').innerHTML="";

                let header = document.createElement("h2");
                header.style.cssText = "color: red";
                header.innerHTML = "Incorrect Login - Please try again";
                document.getElementById('myList').appendChild(header)

              } else { 

              document.getElementById('myList').innerHTML="";
   
              //Below we create the table that will display our outstanding tasks
              if (this.state.list1.length > 0) {

                let tbl = document.createElement("Table");
                tbl.id = "Table";
                tbl.className = 'table table-hover'
                let tblHead = document.createElement("thead");
                tblHead.style.cssText = "color: white";
                tblHead.style.backgroundColor =  "midnightblue";
                tblHead.id = "tableHead";
                let traceHead =  document.createElement("tr");
                traceHead.id = "traceHead";
                document.getElementById('myList').appendChild(tbl);
                document.getElementById('Table').appendChild(tblHead);
                document.getElementById('tableHead').appendChild(traceHead);


                const colHeaders = ['Id', 'Task', 'Assigned', 'Cash', 'email', 'Progress'];

                for (let k = 0; k<colHeaders.length; k++) {
                  let tblHdData = document.createElement("th");
                  tblHdData.innerHTML = colHeaders[k];
                  document.getElementById('traceHead').appendChild(tblHdData);
                }

                let tblBody = document.createElement("tbody");
                tblBody.id = "tableBody";

                document.getElementById('Table').appendChild(tblBody);

                for (let i = 0; i < this.state.list1.length; i++) {
                  let traceBody = document.createElement("tr");
                  let identity = 'id'+i;
                  traceBody.id = identity;
                  document.getElementById('tableBody').appendChild(traceBody)   
                  
                  let id0 = document.createElement('td');
                  id0.innerHTML = this.state.list1[i].id;
                  document.getElementById(identity).appendChild(id0);

                  let task0 = document.createElement('td');
                  task0.innerHTML = this.state.list1[i].task;
                  document.getElementById(identity).appendChild(task0);

                  let assign0 = document.createElement('td');
                  assign0.innerHTML = this.state.list1[i].assign;
                  document.getElementById(identity).appendChild(assign0);

                  let cash0 = document.createElement('td');
                  cash0.innerHTML = this.state.list1[i].cash;
                  document.getElementById(identity).appendChild(cash0);

                  let email0 = document.createElement('td');
                  email0.innerHTML = this.state.list1[i].email;
                  document.getElementById(identity).appendChild(email0);

                  let progress0 = document.createElement('td');
                  progress0.innerHTML = this.state.list1[i].progress;
                  document.getElementById(identity).appendChild(progress0);

                }

              } else {
                alert('No tasks currently!')
              }
            }
          })
        };
        


 /*Here the we create a function that updates the mongodb database, in this case the user can add a task to the
 list */ 
   handleSubmit(event) {

      if(this.state.list1.msg === 'Incorrect Login') {
          alert('you are not logged on!')
      } else {

        const test = Date.now();
    
        const intArr = Array.from(String(test), Number);
        let count = intArr.splice(4,4);
        const singleNumber = Number(count.join(''));

        let id_ = parseInt(singleNumber);        
        let task_ = document.getElementById("task").value;
        let assign_ = document.getElementById("assign").value;
        let cash_ = document.getElementById("cash").value;
        let email_ = document.getElementById("email").value;
        let progress_ = document.getElementById("progress").value;

        event.preventDefault();
        
        var newItem = {
          id: id_,
          task: task_,
          assign: assign_,
          cash: cash_,
          email: email_,
          progress: progress_
        };

        axios.post('http://localhost:8000/create', newItem)

        if(task_ === '' || assign_ === '' || cash_ === '' || email_ === '' || progress_ === '' ) {
          alert('Please Check Inputs')
        } else {
          alert('task added')
        }

        window.location.reload();

        };

      };
    
  /*This button allows the user to remove a task from the todo list */
   removeButton() {
    if(this.state.list1.msg === 'Incorrect Login') {
      alert('you are not logged on!')
      } else {

      let rem = prompt("Please select the id of the item you want removed",);
      let rem1 = parseInt(rem)

      if(list.includes(rem1)) {
        
      var delTask = {
        remove: rem1
      }

      axios.post('http://localhost:8000/delete1', delTask);
      alert('task deleted')
      window.location.reload();

    } else {
      alert('Please Check: Id not in list')
  }

  }
};

  /*This button allows the user to update a task from the todo list */
    updateButton() {
      if(this.state.list1.msg === 'Incorrect Login') {
        alert('you are not logged on!')
        } else {

      let up = prompt("Please select the id of the item you want updated",);
      let up1 = parseInt(up)

      if(list.includes(up1)) {

        var filter = this.state.list1.filter(element => element.id == up1);
     
        let id_u = up1;   
        let task_u = filter[0].task;
        let assign_u = filter[0].assign;
        let cash_u = filter[0].cash;
        let email_u = filter[0].email;
        let progress_u = filter[0].progress;

        if(document.getElementById("task").value === '') {
           task_u = filter[0].task;
        } else {
           task_u = document.getElementById("task").value;
        }

        if(document.getElementById("assign").value === '') {
           assign_u = filter[0].assign;
        } else {
           assign_u = document.getElementById("assign").value;
        }

        if(document.getElementById("cash").value === '') {
           cash_u = filter[0].cash;
        } else {
           cash_u = document.getElementById("cash").value;
        }

        if(document.getElementById("email").value === '') {
           email_u = filter[0].email;
        } else {
           email_u = document.getElementById("email").value;
        }

        if(document.getElementById("progress").value === '') {
           progress_u = filter[0].email;
        } else {
           progress_u = document.getElementById("progress").value;
        }
        
        var updateItem = {
          id: id_u,
          task: task_u,
          assign: assign_u,
          cash: cash_u,
          email: email_u,
          progress: progress_u
        };

        console.log(updateItem);

        axios.post('http://localhost:8000/updatemany1', updateItem)

      } else {
        alert('Please Check: Id not in list');
      }

    }
  }

/*We display and render our component below */
render() {

    return (
        <div>
          <div style={{paddingLeft:'20px', paddingRight: '20px', paddingTop: '20px'}}>
        <h1 style={{color: "white", backgroundColor: 'royalblue'}}><b>Task Manager</b></h1>
        </div>

        <form>
            <div style={{paddingLeft: "100px"}} className='form-inline'>

            <div style={{padding: "10px"}} className='form-group'>
            <input type="text" id="task" name ='task' value={this.state.task} autoComplete='off' className='form-control' placeholder='task'></input>
            </div>

            <br />

            <div style={{padding: "10px"}} className='form-group'>
            <input type="text" id="assign" name ='assign' value={this.state.assign} autoComplete='off' className='form-control' placeholder='assign'></input>
            </div>

            
            <br />

            <div style={{padding: "10px"}} className='form-group'>
            <input type="text" id="cash" name ='cash' value={this.state.cash} autoComplete='off' className='form-control' placeholder='cash'></input>
            </div>

            
            <br />

            <div style={{padding: "10px"}} className='form-group'>
            <input type="text" id="email" name ='email' value={this.state.email} autoComplete='off' className='form-control' placeholder='email'></input>
            </div>

            
            <br />

            <div style={{padding: "10px"}} className='form-group'>
            <input type="text" id="progress" name ='progress' value={this.state.progress} autoComplete='off' className='form-control' placeholder='progress'></input>
            </div>


            </div>

            <br />
          

            <div style={{paddingLeft: "400px"}} className='form-inline'>
              
            <div style={{padding: "10px"}} id="create">
                <button className='btn btn-lg btn-info' onClick={this.handleSubmit}>Create</button>
          
            </div>

                <div style={{padding: "10px"}} id="remove">
              <button id="removeButton" onClick={this.removeButton} className='btn btn-lg btn-success'>Remove</button>
            </div>

            <div style={{padding: "10px"}} id="update">
              <button id="updateButton" onClick={this.updateButton} className='btn btn-lg btn-warning'>Update</button>
            </div>

      
            <div style={{padding: "10px"}} id="login">
              <button style={{color: "white"}} id="loginButton" className='btn btn-lg btn-danger'><Link style={{color: "white"}} className="link" to='/'>Login page</Link></button>
            </div>

            </div>


        </form>
             <br />
            <div style={{paddingLeft:'20px', paddingRight: '20px', paddingTop: '15px'}}>
            <h2 style={{color: 'white', backgroundColor: 'darkred'}}><b>Activities Outstanding</b></h2>    
            </div>      
            <div style={{paddingLeft: "20px", paddingRight: '20px'}} id="myList"></div>

        </div>
        )}
    };

export default Todo;
