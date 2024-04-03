import React, {useState} from 'react';
import '../assets/styles/register.scss';
import axios, { AxiosError } from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import {GoogleLogo} from '@phosphor-icons/react';

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
  const navigate = useNavigate();

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
    if (e.target.name === 'email' && value.includes('@') && value.split('@')[1].length >= 5) {
      validateExists(e, 'email');
    } else if (e.target.name === 'username' && value.length >= 5) {
      validateExists(e, 'username');
    } else {
      if (e.target.name === 'email') {
        setEmailExists('');
      } else if (e.target.name === 'username') {
        setUsernameExists('');
      }
    }
  
  };

  const validateExists = async (e:React.ChangeEvent<HTMLInputElement>, fieldName?: string) => {
      const query = e.target.value;
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/validate-exists`, { query });
      if (fieldName === 'email') {
        setEmailExists(response.data.message);
      } else if (fieldName === 'username') {
        setUsernameExists(response.data.message);
      }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        email: user.email,
        username: user.username,
        password: user.password,
      });
      navigate('/');
    } catch (err: any) {
      console.error(err);
      let errorMessage = 'An error occurred.';
      if (err.response) {
        errorMessage = err.response.data.message || errorMessage;
      }
      alert(errorMessage);
    } finally {
      resetState(); 
    }
  };

const handleGoogleLogin = () => {
  window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`;
};

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
        <p>Already got an account😄? <Link to='/login'>Login</Link></p>
        <button type='submit'>Signup</button>
      </form>
        <button onClick={handleGoogleLogin}>
          Signup with Google <GoogleLogo size={24} weight='fill'/>
        </button>
    </div>
  )
}

export default Register