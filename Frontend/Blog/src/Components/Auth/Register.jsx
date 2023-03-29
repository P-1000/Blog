import { useState } from 'react';
import { TextField, Button } from '@mui/material';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}, Confirm Password: ${confirmPassword}`);
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