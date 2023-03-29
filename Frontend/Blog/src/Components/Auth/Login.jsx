import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');


  const handleSubmit = async(event) => {
    event.preventDefault();
   // console.log(`Email: ${email}, Password: ${password}`);
   try {
      const res = await axios.post('http://localhost:3000/api/auth/signin', {name,password});
      console.log(res.data)
   } catch (error) {
    
   }
  };

  return (
    <form
    className='flex flex-col gap-4 w-8/12 mx-56'
     onSubmit={handleSubmit}>
      <TextField
        label="UserName"
        variant="outlined"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <Button type="submit" variant="contained">
        Login
      </Button>
    </form>
  );
}

export default Login;