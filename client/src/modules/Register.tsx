import React, {useState} from 'react';
import '../assets/styles/register.scss';
import axios, { AxiosError } from 'axios';

const Register:React.FC = () => {
  interface userState {
    username: string;
    password: string;
  };

  const [user,setUser] = useState<userState>({
    username: "",
    password: ""
  });

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value
    });
  };

  const validateUsername = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    try {
      const response = await axios.post('http://localhost:8000/auth/validate-username', { query });
      console.log(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const error = err as AxiosError;
        if (error.response?.status === 400) {
          console.log('Username exists', error);
        } else {
          console.log('Unexpected error', error);
        }
      } else {
        console.log('Unexpected error', err);
      }
    }
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('http://localhost:8000/auth/register', {
      username: user.username,
      password: user.password,
    }).then(()=>{
      // Item Added 
      alert('Account created');
  }).catch((err: AxiosError) => {
    // Handle error
    console.error(err);
    if (err.response) {
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      console.log(err.request);
    } else {
      console.log('Error', err.message);
    }
    alert('An error occurred');
  });
}

  return (
    <div className='uniform-margin register_main'>
      <h1>Sign Up</h1>
      <form action="post" onSubmit={handleSubmit}>
        <span>
        <label htmlFor="username">Username:</label>
        <input 
        type="text"
        name='username'
        value={user.username}
        onChange={(e) => {
          handleChange(e);
          validateUsername(e);
        }}
        placeholder='Enter a unique username...'
        />
        </span>
        <span>
        <label htmlFor="password">Password:</label>
        <input 
        type="password"
        name='password'
        value={user.password}
        onChange={handleChange}
        placeholder='Enter secure password...'
        />
        </span>
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register