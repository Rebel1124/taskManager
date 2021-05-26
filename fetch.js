//We first import the fetch module, which we will use in our function. 
//This module will basically allow us to fetch api data
const fetch = require("node-fetch");

//We then create a module which we export that contains a function (retrieve) that basically checks if the api
//data was retrieved and returned successfully or not.
module.exports = {
    retrieve: function() {

        fetch('http://localhost:8000/task')
        .then(res => res.json())
        .then(result => console.log('Request Successful'))
        .catch(err => console.log('Request Failed')); 

    }
}