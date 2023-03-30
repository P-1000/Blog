import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';


function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}, Confirm Password: ${confirmPassword}`);
    try { 
      axios.post('http://localhost:3000/api/auth/signup', {name,password,email})
      .then(response => {
        console.log(response.data)
        navigate('/login')
      })
      .catch(error => {
        console.log(error)
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <form className='flex flex-col w-8/12 mx-56 gap-4' onSubmit={handleSubmit}>
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
       <TextField
        label="UserName"
        variant="outlined"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <TextField
        label="Confirm Password"
        variant="outlined"
        type="password"
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
      />
      <Button type="submit" variant="contained">
        Register
      </Button>
    </form>
  );
}

export default Register;