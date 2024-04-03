import React, { useState } from 'react';
import '../assets/styles/register.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogo } from '@phosphor-icons/react';

const Login: React.FC= () => {
  interface userState {
    emailUsername: string;
    password: string;
  }

  const [user,setUser] = useState<userState>({
    emailUsername: "",
    password: ""
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value
    });
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('http://localhost:8000/auth/login', {
      username: user.emailUsername,
      password: user.password
    }).then((response) => {
      console.log(response)
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
  };

  return (
    <div className='uniform-margin register_main'>
      <h1>Login</h1>
      <form action="post" onSubmit={handleSubmit}>
        <span>
          <label htmlFor="usernameEmail">Username/Email:</label>
          <input 
          type='text'
          name='emailUsername'
          value={user.emailUsername}
          onChange={handleChange}
          placeholder='Enter username/email...'
          />
        </span>
        <span>
          <label htmlFor="password">Password:</label>
          <input 
          type="password"
          name='password'
          value={user.password}
          onChange={handleChange}
          placeholder='Enter your password...'
          />
        </span>
        <p>Just got here🙂?<Link to='/register'>Signup</Link></p>
        <button type='submit'>Login</button>
      </form>
      <button onClick={handleGoogleLogin}>
        Login with Google <GoogleLogo size={24} weight='fill'/>
      </button>
    </div>
  )
}

export default Login