import axios from 'axios';

// const url = 'https://back-e0rl.onrender.com';
const url = 'http://localhost:3000';

const instance = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default instance;