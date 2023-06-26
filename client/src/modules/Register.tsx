import React, {useState} from 'react';
import '../assets/styles/register.scss';
import axios, { AxiosError } from 'axios';
import { Link } from 'react-router-dom';

const Register:React.FC = () => {
  interface userState {
    email: string;
    username: string;
    password: string;
  };

  const [user,setUser] = useState<userState>({
    email: "",
    username: "",
    password: ""
  });
  const [usernameExists,setUsernameExists] = useState("");
  const [emailExists, setEmailExists] = useState("");

  const resetState = () => {
    setUsernameExists("");
    setEmailExists("");
    setUser({
      email: "",
      username: "",
      password: ""
    });
  }

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value
    });
  };

  const validateExists = async (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 4) {
      const query = e.target.value;
      const response = await axios.post('http://localhost:8000/auth/validate-exists', { query });
      return response.data;
    }
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios.post('http://localhost:8000/auth/register', {
      email: user.email,
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
  resetState();
}

  return (
    <div className='uniform-margin register_main'>
      <h1>Sign Up</h1>
      <form action="post" onSubmit={handleSubmit}>
        <span>
        <label htmlFor="email">Email:</label>
        <input 
        type="email"
        name='email'
        value={user.email}
        onChange={async (e) => {
          handleChange(e);
          const data = await validateExists(e);
          e.target.value.length >= 4 ? setEmailExists(data) : setEmailExists("");
        }}
        placeholder='youremail@example.com'
        />
        {
          emailExists !== "" ? <p>{emailExists}</p> : ""
        }
        </span>
        <span>
        <label htmlFor="username">Username:</label>
        <input 
        type="text"
        name='username'
        value={user.username}
        onChange={ async (e) => {
          handleChange(e);
          const data = await validateExists(e);
          e.target.value.length >= 4 ? setUsernameExists(data)  : setUsernameExists("");
        }}
        placeholder='Enter a unique username...'
        />
        {
          usernameExists !== "" ? <p>{usernameExists}</p> : ""
        }
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
        <p>Already got an account 😏? <Link to='/login'>Login</Link></p>
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register