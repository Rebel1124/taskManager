/*Import required libraries and css styling*/
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import './css/myStyle.css';

/*Import user defined modules */
import Login from './Components/Login.js';
import ToDo from './Components/ToDo.js';

/*Import bootstrap and link to bootstrap */
import 'bootstrap/dist/css/bootstrap.min.css';

<link
  rel="stylesheet"
  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
  integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
  crossorigin="anonymous"
/>

/*Create or define our app below. Here we used the router feature. The user defaults to a login page
and if the user enters the correct details, they are authenticated and taken to the /todo page which
which displays the list collection from the mongodb database. The user can then interact with the database
from here*/
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route path='/' exact>
            <Login />
          </Route>

          <Route path='/todo' exact>
            <ToDo />
          </Route>

        </Router>
      </div>
    );
  };
};

export default App;
