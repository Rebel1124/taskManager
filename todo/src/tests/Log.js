////First Import React and the necessary libraries including axios.
import React, {useState} from 'react'
import axios from 'axios'

/*Create a function handle user authentication and login */
function Login () {
      
    const [input, setInput] = useState ({
        username: '',
        password: '',
    })

/*This button updates the user name and password (basically assigns what the user entered for 
  username and password) */
    function handleChange2(event) {
        const {name, value} = event.target;

        setInput(prevInput => {
            return {
                ...prevInput,
              [name]: value
           }
        })
    }

  /*This button basically sends what the user entered for their name and password to be authenticated
  In particular, the post methid returns a token to be verified */
    function handleClick(event) {
        event.preventDefault();
        var login = {
             username: input.username,
             password: input.password,
        };

       axios.post('/login', login)
       .then((response) => {
           console.log(response.data.token)
           console.log(response.data.verify)
           localStorage.setItem("token", "Bearer "+ response.data.token)
           localStorage.setItem("verify", response.data.verify)
       })
        console.log(input.username+' '+input.password);
        alert('Details Submitted')


    };

    /*The below button function basically authenticates the user and if succeffully authenticated, the
    user is taken to the todo list page. */
    function handleList(event) {
        event.preventDefault();

        fetch('/resource', {
            method: 'GET',
            headers: {
              'Authorization': localStorage.getItem("token")
            }
          })
          .then(res => res.json())
          .then(response => { 
            console.log(response) 
          localStorage.setItem("verify", response.auth)
          })
          .catch(err => { console.log(err) })


          if(parseInt(localStorage.getItem("verify")) === 1) {
            alert('User Authenticated');
            window.location.replace('http://localhost:3000/todo');
          
          } else {
            alert('Please check login details');
          }

    }


    /*We display and render our login page below */
    return <div className = 'container'>
        <br />
        <h1 className="text-info">Login Details</h1>
        <br />
        <form>

            <div className='form-group'>
            <input onChange={handleChange2} name ='username' value={input.username} autoComplete='off' className='form-control' placeholder='username'></input>
            </div>

            <br />

            <div className='form-group'>
            <input type="password" onChange={handleChange2} name ='password' value={input.password} autoComplete='off' className='form-control' placeholder='password'></input>
            </div>

            <br />

            <div className='form-inline'>
              <div style={{padding: "10px"}}>
              <button onClick={handleClick} className='btn btn-lg btn-info'>Submit</button>
              </div>
              <div style={{padding: "10px"}}>
              <button onClick={handleList} className='btn btn-lg btn-secondary'>Authenticate</button>
              </div>
            </div>

         </form>

    </div>
}

export default Login;