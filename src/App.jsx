
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css'

function App() {
  
  const [users, setUser] = useState([])

 useEffect(()=>{
  fetch('http://localhost:3030/users')
    .then(res => res.json())
    .then(data => setUser(data))
    .catch(err => console.error(err))
 }, [])

  
  console.log(users);

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const user  = {name, email, password}




    console.log(user);

    fetch('http://localhost:3030/users',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(res => res.json())
    .then(data => {
      const newUser = [...users, data]
      setUser(newUser)
      console.log('set New user', newUser);

    })
    
    

    form.reset();
  }

  return (
    <>
      
      <p className="read-the-docs">
        User management system.Length is   __
        {
          users.length
        }
      </p>

      <form onSubmit={handleSubmit}  className='form'>
        <h1>From CLient....</h1>
        <input type="text" name='name'   placeholder='name' />
        <input type="email" name='email'   placeholder='email' />
        <input type="password" name='password' placeholder='password' />
        <input type="submit" className='submit' value='add user' />
      </form>

      <div>
        {
          users.map(res => <p key={res.id}>{res.id}: {res.name}: {res.email}</p>)
        }
      </div>
    </>
  )
}

export default App
